import bcrypt from "bcrypt";
import db from "../config/database.js";

export const registerUser = async (req, res)=> {
    const {fName, lName, password, username, email} = req.body;
    try {
        const existingUser = await db.query(`
            select * from users
            where email = $1
        `, [email]);
        if(existingUser.rows.length > 0) {
            return res.status(409).json({message: "Email already exists"});
        }
        const displayName = `${fName} ${lName}`;

        bcrypt.hash(password, 10, async (err, hash)=> {
            if(err) {
                console.log("Error hashing the password")
            }
            const result = await db.query(`
                insert into users (email,password_hash, auth_provider, display_name, profile_pic_url, username)
                values ($1, $2, 'local', $3, 'https://placehold.co/100x150', $4)
                returning * 
            `, [email, hash, displayName, username]);

            req.login(result.rows[0], (err)=> {
                if (err) return res.status(500).json({message: "Login failed after registration."})
                res.redirect('http://localhost:5173/dashboard');
            }) 
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error during registration."})
    }
}