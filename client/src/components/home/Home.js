import { useSelector } from 'react-redux';

import Hero from '../hero/Hero';
import { isAuth } from '../../actions/auth';
import Favorites from '../favorites/Favorites';
import { MAX_NUMBER_OF_FAVORITES_TO_SHOW } from '../../constants';

const Home = () => {
    const userFavorites = useSelector((state) => state.favorites.userFavorites);

    let favorites = Object.keys(userFavorites).map((key) => userFavorites[key]);
    favorites = favorites.slice(0, MAX_NUMBER_OF_FAVORITES_TO_SHOW);

    return (
        <>
            <Hero />
            {isAuth() && <Favorites favorites={favorites} />}
        </>
    );
}

export default Home;