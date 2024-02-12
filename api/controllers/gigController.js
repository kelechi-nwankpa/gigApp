import Gig from "../models/gigModel.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
    
    if (!req.isSeller) return next(createError(403, "Only sellers can create Gigs"))

    const addGig = new Gig({
        ...req.body,
        userId: req.user
    });

    try {
        const savedGig = await addGig.save();
        res.status(201).send(savedGig);
    } catch (err) {
        next(err);
    }
};

export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(createError(404, "No Gig found"))

        res.status(200).send(gig);

    } catch (err) {
        next(createError(err));
    }

};

export const deleteGig = async (req, res, next) => {

    try {
        //check if person deleting is able to delete
        const gig = await Gig.findById(req.params.id);
        if (!gig) return res.status(404).send("Gig not found")
        if (req.user !== gig.userId) return res.status(403).send("You can only delete your own Gig!")

        //if yes, delete, if not, deny
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig deleted successfully!");

    } catch (err) {
        next(createError(err));
    }
};

export const getGigs = async (req, res, next) => {

    const q = req.query;

    const filters = {
        ...(q.cat && {
            cat: {
                $regex: q.cat,
                $options: "i"
            }
        }),
        ...(q.userId && { userId: q.userId }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max })
            }
        }),
        ...(q.search && {
            title: {
                $regex: q.search,
                $options: "i"
            }
        })

    }

    try {

        // future feature could be to allow users to sort createdAt by asc, desc
        const sort = q.sort;
        const gigs = await Gig.find(filters).sort({[sort]: -1});

        if (!gigs) return next(createError(404, "No Gig found"));

        res.status(200).send(gigs);
    } catch (err) {
        next(createError(err));
    }
};