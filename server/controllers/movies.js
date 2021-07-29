const axios = require('axios');
const truncate = require('truncate-html');
const { MAX_SUMMARY_LENGTH } = require('../constants');

exports.searchMovies = async (req, res) => {
    try {
        const movieName = req.params.name.toLowerCase();
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${movieName}`);
        const movies = response.data.map(({ show }) => {
            const summary = truncate(show.summary, MAX_SUMMARY_LENGTH);

            return {
                id: show.id,
                title: show.name,
                image: show.image && show.image.medium,
                genres: show.genres.join(', '),
                officialSite: show.officialSite,
                runtime: show.runtime,
                summary,
                premiered: show.premiered
            }
        }).filter((movie) => movie.image != null && movie.officialSite != null);

        res.status(200).send({ movies });
    } catch (error) {
        res.status(400).send({ error });
    }
}

exports.getMovie = async (req, res) => {
    try {
        const movieId = req.params.movieid.toLowerCase();
        const response = await axios.get(`https://api.tvmaze.com/shows/${movieId}`);
        
        let { id, name, image, genres, officialSite, runtime, summary, premiered } = response.data;
        const summ = truncate(summary, MAX_SUMMARY_LENGTH);
        const movie = {
            id,
            title: name,
            image: image && image.medium,
            genres: genres.join(', '),
            officialSite,
            runtime: runtime,
            summary: summ,
            premiered: premiered
        };

        res.status(200).send({ movie });
    } catch (error) {
        res.status(400).send({ error });
    }
}
