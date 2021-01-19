import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import NewPhoto from './containers/NewPhoto/NewPhoto';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import Photos from './containers/Photos/Photos';
import FullPhoto from './containers/FullPhoto/FullPhoto';
import MyPhotos from './containers/MyPhotos/MyPhotos';
import EditPhoto from './containers/EditPhoto/EditPhoto';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import * as actions from './store/actions/index';

const App = () => {
  const routes = ['/', '/auth', '/new-photo', '/my-photos', '/logout'];
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  return (
    <div className="App">
      <Route
        path="/"
        render={(history) => (
          <AppBar>
            <Tabs
              // value={
              //   history.location.pathname !== '/'
              //     ? history.location.pathname
              //     : false
              // }
              value={0}
            >
              <Tab
                // value={routes[0]}
                label="Stock photography"
                component={Link}
                to={routes[0]}
              />

              {isAuthenticated ? (
                <Auxiliary>
                  <Tab
                    // value={routes[2]}
                    label="New Photo"
                    component={Link}
                    to={routes[2]}
                  />
                  <Tab
                    // value={routes[3]}
                    label="My Photos"
                    component={Link}
                    to={routes[3]}
                  />
                  <Tab
                    // value={routes[4]}
                    label="Log out"
                    component={Link}
                    to={routes[4]}
                  />
                </Auxiliary>
              ) : (
                <Tab
                  // value={routes[1]}
                  label="Log in"
                  component={Link}
                  to={routes[1]}
                />
              )}
            </Tabs>
          </AppBar>
        )}
      />

      <Switch>
        <Route exact path="/" component={Photos} />
        <Route exact path="/my-photos" component={MyPhotos} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/new-photo" component={NewPhoto} />
        <Route exact path="/photos/edit/:id" component={EditPhoto} />
        <Route exact path="/photos/:id" component={FullPhoto} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </div>
  );
};

export default App;
