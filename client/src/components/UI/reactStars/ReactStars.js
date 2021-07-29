import Stars from 'react-rating-stars-component';
import { bool, string, number, func } from 'prop-types';

const ReactStars = ({ onChange, size, value, count = 5, isHalf = true, activeColor = '#ffd700'}) => {
    return (
        <Stars 
            count={count}
            onChange={onChange}
            size={size}
            isHalf={isHalf}
            value={value}
            activeColor={activeColor}
        />
    );
}

ReactStars.propTypes = {
    onChange: func,
    size: number,
    value: number,
    count: number,
    isHalf: bool,
    activeColor: string,
}

export default ReactStars;