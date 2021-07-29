import { bool, string } from 'prop-types';
import { Image as AntImage } from 'antd';

const Image = ({ alt, fallback, src, className, preview = false}) => {
    return (
        <AntImage
            className={className}
            alt={alt}
            fallback={fallback}
            preview={preview}
            src={src}
        />
    );
}

Image.propTypes = {
    alt: string.isRequired,
    src: string.isRequired,
    fallback: string,
    className: string,
    preview: bool,
}

export default Image;