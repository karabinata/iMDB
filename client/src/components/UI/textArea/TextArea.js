import { string, func } from 'prop-types';
import { Input } from 'antd';

const TextArea = ({ placeholder, onChange, value, className, rows }) => {
    return (
        <Input.TextArea
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            rows={rows}
            className={className}
        />
    );
}

TextArea.propTypes = {
    placeholder: string.isRequired,
    onChange: func.isRequired,
    value: string
}

export default TextArea;