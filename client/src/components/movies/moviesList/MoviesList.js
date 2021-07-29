import { List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { getMoviesByName } from '../../../store/movies/actions';
import { Movie } from '..';
import { useEffect } from 'react';

const MoviesList = ({ match }) => {
    const { name } = match.params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesByName(name));
    }, [name, dispatch]);

    const movieList = useSelector((state) => state.movies.movieList);
    const userFavorites = useSelector((state) => state.favorites.userFavorites);

    const renderMovies = () => {
        return movieList && movieList.map((movie) => {
            const isFavorite = userFavorites && userFavorites[movie.id] !== undefined;
            const favoriteId = userFavorites && userFavorites[movie.id] && userFavorites[movie.id].id;
            return <Movie key={movie.id} {...movie} isFavorite={isFavorite} favoriteId={favoriteId} />
        });
    }

    return (
        <List>
            {renderMovies()}
        </List>
    );
}

export default MoviesList;