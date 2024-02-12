import Review from "../models/reviewModel.js";
import Gig from "../models/gigModel.js";
import 'dotenv/config';
import createError from "../utils/createError.js";

// export const getReview = async(req, res, next) => {

// }

export const getReviews = async (req, res, next) => {
    const gigId = req.params.gigId;

    try {
        const reviews = await Review.find({ gigId: gigId });
        if (!reviews || reviews.length === 0) return next(createError(404, "No review found for this gig"));
        
        res.status(200).send(reviews);
    } catch (err) {
        next(err)
    }

}

export const postReview = async (req, res, next) => {
    //make sure that the reviewer(poster) is not the creator of the Gig.
    //findOne returns an array, evene if it's empty.
    const isReviewerSeller = await Gig.findOne({
        _id: req.body.gigId,
        userId: req.user
    });

    if (isReviewerSeller) return next(createError(403, "Sorry, sellers can't post reviews on their own gigs!"));

    try {
        const hasReviewed = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.user
        })

        if (hasReviewed) return next(createError(403, "Sorry, you have already created a review for this Gig"));


        const addReview = new Review({
            ...req.body,
            userId: req.user
        })

        const savedReview = await addReview.save();
        res.status(201).send(savedReview);
    } catch (err) {
        next(err)
    }

    // const addReview = new Review({
    //     ...req.body,
    //     userId: req.user
    // })

    try {
        // const savedReview = await addReview.save();
        // res.status(201).send(savedReview);
    } catch (err) {
        next(err)
    }

    //If creator, send a message that they can't create a review on thier own Gig.

    //if not creator, allow to create review.
}

export const deleteReview = async (req, res, next) => {

}