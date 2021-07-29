import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import { PageHeader } from './components/layout';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import { MovieDetails, MoviesList } from './components/movies';
import { fetchUserFavorites } from './store/favorites/actions';
import { signInFromCookie } from './store/auth/actions';
import { isAuth } from './actions/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    isAuth() && dispatch(fetchUserFavorites());
    if (isAuth()) {
      dispatch(signInFromCookie())
    }
  }, [dispatch]);

  return (
    <Layout className="App">
      <PageHeader />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:name" component={MoviesList} />
        <Route path="/movie/:movieid" component={MovieDetails} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Layout>
  );
}

export default App;
