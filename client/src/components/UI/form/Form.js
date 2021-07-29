import { bool, object, func, array } from 'prop-types';
import { Form as AntForm } from 'antd';

const Form = ({ children, className, labelCol, wrapperCol, scrollToFirstError, onFinish, onFinishFailed }) => {
    return (
        <AntForm
            className={className}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            scrollToFirstError={scrollToFirstError}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >{children}</AntForm>
    );
}

Form.propTypes = {
    children: array,
    labelCol: object,
    wrapperCol: object,
    scrollToFirstError: bool,
    onFinish: func,
    onFinishFailed: func
}

export default Form;