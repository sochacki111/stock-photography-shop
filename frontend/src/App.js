import React from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { createStore } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';

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

// TODO Use redux to render tabs conditionally
// redux state
const App = () => {
  const routes = ['/', '/auth', '/new-photo', '/my-photos', '/logout'];
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  console.log(isAuthenticated);

  return (
    <div className="App">
      <Route
        path="/"
        render={(history) => (
          <>
            <AppBar>
              <Tabs
                // value={
                //   history.location.pathname !== '/'
                //     ? history.location.pathname
                //     : false
                // }
                value={routes[0]}
              >
                {console.log(history.location.pathname)}
                <Tab
                  value={routes[0]}
                  label="Stock photography"
                  component={Link}
                  to={routes[0]}
                />

                {isAuthenticated ? (
                  <Auxiliary>
                    <Tab
                      value={routes[2]}
                      label="New Photo"
                      component={Link}
                      to={routes[2]}
                    />
                    <Tab
                      value={routes[3]}
                      label="My Photos"
                      component={Link}
                      to={routes[3]}
                    />
                    <Tab
                      value={routes[4]}
                      label="Log out"
                      component={Link}
                      to={routes[4]}
                    />
                  </Auxiliary>
                ) : (
                  <Tab
                    value={routes[1]}
                    label="Log in"
                    component={Link}
                    to={routes[1]}
                  />
                )}
              </Tabs>
            </AppBar>
          </>
        )}
      />

      <Switch>
        <Route exact path="/" component={Photos} />
        <Route exact path="/my-photos" component={MyPhotos} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/new-photo" component={NewPhoto} />
        <Route exact path="/category/:id" component={Photos} />
        <Route exact path="/photos/edit/:id" component={EditPhoto} />
        <Route exact path="/photos/:id" component={FullPhoto} />
      </Switch>
    </div>
  );
};

export default App;
