import express from "express";
import path from "path";
import cors from "cors";
import passport, { Passport } from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = process.env.SERVER_PORT;
env.config();

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}))

const db = new pg.Pool({
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    host: process.env.DB_HOST
})

app.get("/", (req,res)=> {
    res.render("index.html")
})

app.post("/register", async (req, res)=> {
    const {fName, lName, password, username, email} = req.body;
    try {
        const existingUser = await db.query(`
            select * from users
            where email = $1
        `, [email]);
        if(existingUser.rows.length > 0) {
            res.redirect("/login")
        }
        const displayName = fName + " " + lName;
        bcrypt.hash(password, 10, async (err, hash)=> {
            if(err) {
                console.log("Error hashing the password")
            }
            const result = await db.query(`
                insert into users (email,password_hash, auth_provider, display_name, profile_pic_url, username)
                values ($1, $2, 'local', $3, 'https://placehold.co/100x150', $4)
                returning * 
            `, [email, hash, displayName, username]);
        })
        req.login(result.rows[0], ()=> {
            res.redirect("/");
        }) 
    }
    catch(err) {
        console.log(err);
    }
     
})
passport.use("local", new Strategy(async (password, email, cb)=> {
    try {
        const existingUser = await db.query(`select * from users where email = $1`, [email]);
        if(existingUser.rows.length === 0) cb(null, false);
        const user = existingUser.rows[0];
        bcrypt.compare(password, user.password_hash, (err, valid) => {
            if(err) return cb(err);
            if(!valid) return cb(null, false);
            return cb(null, user);
        })
    }
    catch(err) {
        return cb(err);
    }
}))

passport.serializeUser((user, cb)=> {
    cb(null, user);
})
passport.deserializeUser((user, cb)=> {
    cb(null, user);
})


app.listen(port, ()=> console.log("Server is running on", port));