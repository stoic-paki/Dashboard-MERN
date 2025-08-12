import UserModel from "../Models/User.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409).json({ message: 'user already exists', success: false })
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();
        res.status(201).json({
            message: 'sign up',
            success: true
        })
        console.log(`res.status(201).json({message:'sign up', 
            success: true
        })`)
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false
        })
    }
}

// login functionality 

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const errorMessage = 'Auth failed email or password is wrongs'
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({ message: errorMessage, success: false })
        }
        // creating jwt token only if user password is right

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn:'24hr'
            }
        )

        res.status(200).json({
            message: 'login success',
            success: true,
            jwtToken,
            email,
            name:user.name,
        })
        console.log(`res.status(200).json({message:'login success', 
            success: true
        })`)
    } catch (error) {
        res.status(500).json({
            message: 'internal server error',
            success: false
        })
    }
}

export default signup