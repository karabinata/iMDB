const Rating = require('../models/rating');

exports.fetchUserMovieRating = async (req, res) => {
    const userId = req?.profile?.id;
    const { movieId } = req.params;
    if (!movieId) {
        throw new Error('Movie id missing');
    }

    try {
        let rating = await Rating.findOne({
            where: { userId, movieId: movieId }
        });
        
        res.status(200).send({ rating });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            movieId,
            rating
        } = req.body;

        const userId = req?.profile?.id;

        const newRating = await Rating.create({
            movieId,
            rating,
            userId
        });

        await newRating.save();

        res.status(201).send({ message: 'New rating added succesfully.' });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.updateRating = async (req, res) => {
    const userId = req?.profile?.id;
    const { rating } = req.body;
    const { ratingId } = req.params;

    if (!ratingId) {
        throw new Error('Rating id missing');
    }

    try {
        const ratingToUpdate = await Rating.findOne({ where: { id: ratingId }});

        if (ratingToUpdate.userId !== userId) {
            throw new Error('Rating cannot be updated');
        }

        if (!ratingToUpdate) {
            throw new Error('Rating can not be found.');
        }

        await ratingToUpdate.update({rating});

        res.status(200).send({ message: 'Updated' });
    } catch (error) {
        return res.status(400).send({ error });
    }
}