import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// /api/auth/login
router.post("/login", 
[
    check("email", "Email is required").isEmail(),
    check("password", "Strong password with 8 or more characters is required").isStrongPassword({ minLength: 8 })
], 
async (req: Request, res: Response) => {

    // check if the request fields are valid, if not then return an error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    // destructing the email and password field from the request body
    const { email, password } = req.body;

    // make a database call to verify credentials
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "error",
                msg: "The username or password is incorrect."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "error",
                msg: "The username or password is incorrect."
            });
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
        res.cookie("auth_token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });

        res.status(200).json({
            userId: user._id
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "Something went wrong"
        });
    }
});

export default router;
