import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import NewPhoto from './containers/NewPhoto/NewPhoto';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import Photos from './containers/Photos/Photos';
import FullPhoto from './containers/FullPhoto/FullPhoto';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/new-photo" component={NewPhoto} />
          <Route path="/photos/:id" component={FullPhoto} />
          <Route path="/category/:id" component={Photos} />
          <Route path="/" exact={true} component={Photos} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
