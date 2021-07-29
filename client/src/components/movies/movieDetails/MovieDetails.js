import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { addToFavorites, deleteFromFavorites } from '../../../store/favorites/actions';
import { addMovieNote, updateMovieNote, getMovieNote } from '../../../actions/notes';
import { addMovieRating, getMovieRating, updateMovieRating } from '../../../actions/ratings';
import { Image, Button, ReactStars, TextArea } from '../../UI';
import { isAuth } from '../../../actions/auth';
import { getMovie } from '../../../actions/movie';
import '../movie/Movie.css';
import './MovieDetails.css';

const MovieDetails = ({ match }) => {
    const { movieid } = match.params;
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movieList);
    const userFavorites = useSelector((state) => state.favorites.userFavorites);
    const isFavorite = userFavorites && userFavorites[movieid] !== undefined;
    
    const [data, setData] = useState(movies && movies.find((movie) => movie.id.toString() === movieid));
    const [noteData, setNoteData] = useState(null);
    const [ratingData, setRatingData] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!data) {
                const movie = await getMovie(movieid);
                setData({ movieId: movieid, ...movie });
            }
            const note = await getMovieNote(movieid);
            setNoteData(note);
            const rating = await getMovieRating(movieid);
            setRatingData(rating);
            setDataFetched(true);
        }

        fetchData();
    }, [movieid, refetch]);

    const handleNoteChange = async (e) => {
        if (!isAuth()) {
            history.push('/auth')
        }
        setNoteData(
            {
                ...noteData,
                note: e.target.value
            }
        );
        const newNote = e.target.value;
        if (!noteData) {
            await addMovieNote({ note: newNote, movieId: movieid });
            setRefetch(true);
        } else {
            await updateMovieNote(noteData.id, e.target.value);
        }
    }

    const dispatchAddToFavs = () => {
        if (!isAuth()) {
            history.push('/auth')
        }

        dispatch(addToFavorites(data));
    }

    const dispatchRemoveFromFavs = () => {
        if (!isAuth()) {
            history.push('/auth')
        }
        dispatch(deleteFromFavorites(userFavorites[match.params.movieid].id, match.params.movieid));
    }

    const ratingChanged = async (rating) => {
        if (!isAuth()) {
            history.push('/auth')
        }
        setRatingData(
            {
                ...ratingData,
                rating
            }
        );

        if (!ratingData) {
            await addMovieRating({ rating, movieId: movieid });
            setRefetch(true);
        } else {
            await updateMovieRating(ratingData.id, rating );
        }
    }

    return (
        <>
            {data && <div className="movie-container">
                <Image
                    src={data.image}
                    alt={`${data.title} image`}
                    className="movie-image"
                />
                <div className="movie-info">
                    <h2>
                        {data.title} ({(new Date(data.premiered).getFullYear())})
                    </h2>
                    <div>
                        <span>{data.genres} | {data.runtime} minutes</span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: data.summary }}></div>
                    <a target="_blank" href={data.officialSite} rel="noreferrer">Visit official site</a>
                    <Button 
                        onClick={isFavorite ? dispatchRemoveFromFavs : dispatchAddToFavs} 
                        className={`movie-action-btn ${isFavorite ? 'remove-btn' : 'add-btn'}`}
                        text={isFavorite ? "Remove from favorites" : "Add to favorites" } />
                </div>
            </div>}
            <div className="star-wrapper">
                <h2>Your Review</h2>
                {dataFetched && <ReactStars 
                    count={5}
                    onChange={ratingChanged}
                    size={36}
                    isHalf={true}
                    value={ratingData && ratingData.rating}
                    activeColor="#ffd700"
                />}
            </div>
            <TextArea
                rows={5}
                className="review-textarea"
                placeholder="Your private notes and comments about the movie..."
                onChange={handleNoteChange}
                value={noteData && noteData.note}
            />
            
        </>
    );
}

export default MovieDetails;