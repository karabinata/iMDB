import { string, object, array } from 'prop-types';
import { Form } from 'antd';

const FormItem = ({ children, className, label, name, labelCol, wrapperCol, rules }) => {
    return (
        <Form.Item
            className={className}
            label={label}
            name={name}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            rules={rules}
        >{children}</Form.Item>
    );
}

FormItem.propTypes = {
    children: object,
    labelCol: object,
    label: string,
    name: string,
    wrapperCol: object,
    rules: array
}

export default FormItem;