import { List } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addToFavorites, deleteFromFavorites } from '../../../store/favorites/actions';
import { Image, Button } from '../../UI';
import './Movie.css';
import { isAuth } from '../../../actions/auth';

const Movie = ({ id, genres, image, officialSite , premiered, runtime, title, summary, isFavorite, favoriteId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = {
        movieId: id,
        genres,
        image, 
        officialSite,
        premiered,
        runtime,
        title,
        summary
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
        dispatch(deleteFromFavorites(favoriteId, id));
    }

    return (
        <List.Item key={id} className="movie-container" >
            <Link to={`/movie/${id}`}>
                <Image
                    src={image}
                    alt={`${title} image`}
                    className="movie-image"
                />
            </Link>
            <div className="movie-info">
                <Link to={`/movie/${id}`}>
                    <h2>
                        {title} ({(new Date(premiered).getFullYear())})
                    </h2>
                </Link>
                <div className="genres">
                    <span>{genres} | {runtime} minutes</span>
                </div>
                <div dangerouslySetInnerHTML={{__html: summary }}></div>
                <a className="official-site-link" target="_blank" href={officialSite} rel="noreferrer">Visit official site</a>
                <Button
                    onClick={isFavorite ? dispatchRemoveFromFavs : dispatchAddToFavs}
                    className={`movie-action-btn ${isFavorite ? 'remove-btn' : 'add-btn'}`}
                    text={isFavorite ? "Remove from favorites" : "Add to favorites" }
                />
            </div>
        </List.Item>
    );
}

export default Movie;