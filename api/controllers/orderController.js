import Gig from "../models/gigModel.js";
import Order from "../models/orderModel.js";
import createError from "../utils/createError.js";
import Stripe from "Stripe";

export const success = async (req, res, next) => {

    try {
        await Order.findOneAndUpdate({
            payment_intent: req.body.paymentIntent
        },
            {
                $set: {
                    isCompleted: true
                }
            },
            {
                new: true
            }
        )
       
        return res.status(200).send("Order has been paid for!")
    } catch (err) {
        next(err);
    }
}

export const intent = async (req, res, next) => {

    const stripe = new Stripe(
        process.env.STRIPE_SECRET_KEY
    );

    try {
       
        const gig = await Gig.findById(req.params.gigId);
      
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });


        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.user,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: paymentIntent.id,
        })

        await newOrder.save();
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (err) {
        next(err)
    }
}


export const getOrder = async (req, res, next) => {

    const orders = await Order.find({
        ...(req.isSeller
            ? { sellerId: req.user }
            : { buyerId: req.user }),
        isCompleted: true,
    })
    res.status(200).send(orders);
}