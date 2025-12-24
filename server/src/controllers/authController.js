import bcrypt from "bcrypt";
import db from "../config/database.js";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), '.env') });
const profilePlaceholder = process.env.PROFILE_PLACEHOLDER;

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(`
                insert into users (email,password_hash, auth_provider, display_name, profile_pic_url, username)
                values ($1, $2, 'local', $3, $4, $5)
                returning * 
            `, [email, hashedPassword, displayName, profilePlaceholder, username]);

        const newUser = result.rows[0];
        req.login(newUser, (err)=> {
            if (err) return res.status(500).json({message: "Login failed after registration."})
            return res.status(201).json({
                message: "Registration successful",
                user: newUser
            })
        }) 
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error during registration."})
    }
}