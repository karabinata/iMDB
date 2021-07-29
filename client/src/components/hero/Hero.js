import { Image, Button } from '../UI';
import './Hero.css';

const Hero = () => {
    const focusSearch = () => {
        const searchEl = document.getElementById('search-input');
        searchEl.focus();
    }

    return (
        <div className="hero-container">
            <div className="hero-info-wrapper">
                <h3>Heading</h3>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <Button 
                    text="Search"
                    size="large"
                    type="primary"
                    className="hero-search-btn"
                    onClick={focusSearch}
                />
            </div>
            <Image
                src='/images/gameofthrones.jpeg'
                alt='Hero Image'
                className="hero-image"
            />
        </div>
    );
}

export default Hero;