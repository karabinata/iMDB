import { bool, string, oneOf, func } from 'prop-types';
import { Button as AntButton } from 'antd';

const Button = ({ text, className, htmlType, block, ghost, href, size, target, type, onClick }) => {
    return (
        <AntButton
            className={className}
            htmlType={htmlType}
            block={block}
            ghost={ghost}
            href={href}
            size={size}
            target={target}
            type={type}
            onClick={onClick}
        >{text}</AntButton>
    );
}

Button.propTypes = {
    text: string.isRequired,
    htmlType: oneOf(['submit', 'reset', 'button']),
    block: bool,
    ghost: bool,
    href: string,
    size: oneOf(['large', 'middle', 'small']),
    target: string,
    type: oneOf(['primary', 'ghost', 'dashed', 'link', 'text', 'default']),
    onClick: func
}

export default Button;