import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import createError from "../utils/createError.js";

export const register = async(req, res, next) => {

    try {
        // const userExists = await User.find({username: req.body.username});
        // if(userExists) return res.status(409).send("User already exists");
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();
        res.status(201).send("User created")
    } catch (err) {
        next(err);
    }

}

export const login = async(req, res, next) => {
    try {

        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "No user found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(400, "Wrong password or username!"));
       
        const token = jwt.sign({
            //so that only every user except sellers can create orders and review
            id: user._id,
            isSeller: user.isSeller,
        }, process.env.JWT_KEY);

        const {password, ...otherInfo} = user._doc;

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200)
        .send(otherInfo);
        
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send("User has been logged out")
}