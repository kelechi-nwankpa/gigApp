import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import createError from "../utils/createError.js";

export const createConversation = async(req, res, next)=> {

    //can i use the Orders model here to retrieve the buyerId and use below?

    //check if there is already a conversation(convoId), and if there is, send the convoId,
    //if not, create a new conversation(convoId).
    //const convoId = req.user === req.body.to ?  : 

    const isExists = await Message.findOne({
        conversationId: req.isSeller ? (req.user + req.body.to) : (req.body.to + req.user)
    })

    
    if(isExists){
       return res.status(200).send(isExists);
    }else{

    const newConversation = new Conversation({
        id: req.isSeller ? (req.user + req.body.to) : (req.body.to + req.user),
        sellerId: req.isSeller ? req.user : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.user,
        readBySeller: req.isSeller ? true : false,
        readByBuyer: req.isSeller ? false: true ,
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (err) {
        next(err)
    }
    }
}

export const getConversations = async(req, res, next)=> {
    
    try {
    
        const filter = {
            ...(req.isSeller && {
                sellerId: req.user
            }),
            ...(!req.isSeller && {
                buyerId: req.user
            }) 
        }
        const conversations = await Conversation.find(filter)

        res.status(200).send(conversations);
    } catch (err) {
        next(err);
    }
}

export const getConversation = async(req, res, next)=> {
    
}

export const updateConversation = async(req, res, next)=> {

    const convoId = req.params.conversationId;
    
    try {
    const updatedConversation = await Conversation.findOneAndUpdate(
        {id: convoId},
        { $set: { 
            readBySeller: true,
            readByBuyer: true,
        }},
        { new: true},
    )

    res.status(200).send(updatedConversation);
        
    } catch (err) {
        next(err)
    }

}