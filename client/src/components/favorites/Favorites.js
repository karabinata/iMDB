import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { Image } from '../UI';
import './Favorites.css';

const Favorites = ({ favorites }) => {
    const renderFavorites = () => {
        return favorites.map(({ movieId, image, title}) => (
            <Col key={movieId} span={4} className="user-favorite-col">
                <Link to={`/movie/${movieId}`}>
                    <Image
                        src={image}
                        alt={`${title} image`}
                        className="movie-image"
                    />
                </Link>
            </Col>
        ));
    }
    return (
        <Row justify="center" className="user-favorites">
            {renderFavorites()}
        </Row>
    );
}

export default Favorites;