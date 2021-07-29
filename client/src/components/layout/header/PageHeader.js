import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Search from '../../search/Search';
import { Button } from '../../UI';
import { clearUserFavorites } from '../../../store/favorites/actions';
import { signOut } from '../../../store/auth/actions';
import './PageHeader.css';

const PageHeader = () => {
    const { Header } = Layout;
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.user !== null);

    const signUserOut = () => {
        dispatch(clearUserFavorites());
        dispatch(signOut());
    }

    const renderSignout = () => {
        return isAuth && <Button text="Sign out" onClick={signUserOut} />;
    }

    return (
        <Header className="header">
            <Link className="home-btn" to="/">Home</Link>
            <Search className="header-search" />
            {renderSignout()}
        </Header>
    );
}

export default PageHeader;