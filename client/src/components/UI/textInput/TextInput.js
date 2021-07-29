import { bool, string, oneOf, func } from 'prop-types';
import { Input } from 'antd';

const TextInput = ({ id, className, bordered, defaultValue, placeholder, size, value, onChange, onPressEnter, type = 'text' }) => {
    return (
        <Input
            id={id}
            className={className}
            bordered={bordered}
            placeholder={placeholder}
            defaultValue={defaultValue}
            size={size}
            type={type}
            value={value}
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
    );
}

TextInput.propTypes = {
    placeholder: string.isRequired,
    className: string,
    id: string,
    type: string,
    bordered: bool,
    defaultValue: string,
    size: oneOf(['large', 'middle', 'small']),
    value: string,
    onChange: func.isRequired,
    onPressEnter: func
}

export default TextInput;