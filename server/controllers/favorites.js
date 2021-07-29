const Favorite = require('../models/favorite');

exports.fetchUserFavorites = async (req, res) => {
    const userId = req?.profile?.id;
    console.log(userId)

    try {
        let favorites = await Favorite.findAll({
            where: { userId }
        });
        
        res.status(200).send({ favorites });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            movieId,
            title,
            summary,
            premiered,
            genres,
            image,
            runtime,
            officialSite
        } = req.body;

        const userId = req?.profile?.id;

        const newFavorite = await Favorite.create({
            movieId,
            title,
            summary,
            premiered,
            genres,
            image,
            runtime,
            officialSite,
            userId
        });

        const newFav = await newFavorite.save({ returning: true });

        res.status(201).send({ id: newFav.id, message: 'New movie added succesfully.' });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.removeFromFavorites = async (req, res) => {
    const { favId } = req.params;
    const userId = req?.profile?.id;

    if (!favId) {
        throw new Error('Fav id missing');
    }

    try {
        const favoriteToDelete = await Favorite.findOne({ where: { id: favId }});

        if (favoriteToDelete.userId !== userId) {
            throw new Error('Favorite cannot be deleted');
        }

        if (!favoriteToDelete) {
            throw new Error('Favorite can not be found.');
        }

        await favoriteToDelete.destroy();

        res.status(200).send({ message: 'Deleted' });
    } catch (error) {
        return res.status(400).send({ error });
    }
}