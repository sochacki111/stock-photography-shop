import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Photos from './containers/Photos/Photos';
import NewPhoto from './containers/NewPhoto/NewPhoto';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/photos" component={Photos} />
          <Route path="/new-photo" component={NewPhoto} />
        </Switch>
      </Layout>
      {/* <NewPhoto /> */}
      {/* <Photos /> */}
    </div>
  );
};

export default App;
