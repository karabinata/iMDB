import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextInput, Button } from '../UI';
import { Form } from 'antd';

import './Search.css';

const Search = ({ className }) => {
    const history = useHistory();
    const [value, setValue] = useState('');
    const onFinish = () => history.push(`/search/${value}`);

    return (
        <Form onFinish={onFinish} className={`search-wrapper ${className}`}>
            <TextInput
                id="search-input"
                className="search-input"
                placeholder="Search by movie title..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button
                ghost={true}
                text="Search"
                className="search-btn"
                htmlType="submit"
            />
        </Form>
    );
}

export default Search;