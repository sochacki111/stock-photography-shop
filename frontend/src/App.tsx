import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import NewPhoto from './containers/NewPhoto/NewPhoto';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import Photos from './containers/Photos/Photos';
import FullPhoto from './containers/FullPhoto/FullPhoto';
import MyPhotos from './containers/MyPhotos/MyPhotos';
import EditPhoto from './containers/EditPhoto/EditPhoto';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
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
      </Layout>
    </div>
  );
};

export default App;
