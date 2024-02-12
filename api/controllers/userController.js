import User from "../models/userModel.js";
import 'dotenv/config';
import createError from "../utils/createError.js";

export const deleteUser = async (req, res) => {

    const user = await User.findById(req.params.id)

    if (req.user !== user._id.toString()) return next(createError(403,"You are not permitted to delete this account. Only yours!"))

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");

};

export const getUser = async (req, res, next) => {


    try {
        const user = await User.findById(req.params.id)
        if(!user) return next(createError(404, "No user found"));

        const {password, ...otherInfo} = user._doc;
    
        res.status(200).send(otherInfo);
    } catch (err) {
        next(err)
    }
}