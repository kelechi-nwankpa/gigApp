import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import createError from "../utils/createError.js";

export const getMessage = async (req, res, next) => {

    try {
        const getMessage = await Message.find({ conversationId: req.params.conversationId });
        if (!getMessage) return next(createError(404, "Sorry, this page does not exist"));

        res.status(200).send(getMessage);
    } catch (err) {
        next(err)
    }

};

export const createMessage = async (req, res, next) => {

    const newMessage = new Message({
        conversationId: req.body.id,
        userId: req.user,
        desc: req.body.desc
    })

    try {
        const savedMessage = await newMessage.save();
        if (!savedMessage) return next(createError(400, "Something went wrong"));

        const updateConversation = await Conversation.findOneAndUpdate(
            { id: req.body.id },
            {
                $set: {
                    lastMessage: req.body.desc,
                    readBySeller: req.isSeller ? true : false,
                    readByBuyer: !req.isSeller ? true : false
                }
            },
            { new: true }

        )

        res.status(201).send(savedMessage);
    } catch (err) {
        next(err)
    }
};

export const updateMessage = async (req, res, next) => {

};