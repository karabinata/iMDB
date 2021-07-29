import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signIn, signUp } from '../../store/auth/actions';
import { authenticate } from '../../actions/auth';
import { Form, FormItem, TextInput, Button } from '../UI';
import './Auth.css';

const Auth = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = {
        email: '',
        password: '',
        error: '',
        showSignUp: true,
    };

    const [values, setValues] = useState(initialState);

    const { email , password, error, showSignUp } = values;

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const selectSignUp = () => setValues({ ...values, showSignUp: true });

    const selectSignIn = () => setValues({ ...values, showSignUp: false });

    const handleSubmit = async () => {
        setValues({ ...values });
        const user = { email, password };

        try {
            let response = null;
            if (showSignUp) {
                response = await dispatch(signUp(user));
            } else {
                response = await dispatch(signIn(user));
            }

            const data = response.payload.user;
            
            authenticate(data, () => history.goBack())
        } 
        catch (error) {
            setValues({ ...values, error: 'Server error' });
        }
    }

    const authForm = () => {
        let btnText = showSignUp ? 'Sign Up' : 'Sign In';
        return (
            <Form
                className="auth-form"
                labelCol={{ span: 8 }}
                onFinish={handleSubmit}
            >
                <FormItem
                    label="Email"
                    name="email"
                    rules={[
                        {
                          required: true,
                          message: 'This field is required!'
                        },
                        {
                          type: 'email',
                          message: 'Please input valid email!'
                        }
                      ]}
                >
                    <TextInput placeholder="Email" value={email} onChange={handleChange('email')} />
                </FormItem>
                <FormItem
                    label="Password"
                    name="password"
                    rules={[
                        {
                          required: true,
                          message: 'This field is required!'
                        },
                        () => ({
                          validator() {
                            if (password.length < 6) {
                              return Promise.reject('Password should be at least 6 symbols long')
                            }
                            return Promise.resolve()
                          }
                        })
                    ]}
                >
                    <TextInput
                        type='password'
                        value={password}
                        placeholder="Password"
                        onChange={handleChange('password')}
                    />
                </FormItem>
                <Button 
                    text={btnText}
                    htmlType="submit"
                />
            </Form>
        );
    }
    return (
        <>
            {error && <div className="error">{error}</div>}
            {authForm()}
            <div className="auth-btns-wrapper">
                <Button text="Sign Up" onClick={selectSignUp} /> Or 
                <Button text="Sign In" onClick={selectSignIn} />
            </div>
        </>
    );
}

export default Auth;