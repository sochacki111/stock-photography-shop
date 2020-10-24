import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';

import Photos from '../Photos/Photos';
import FullPhoto from '../FullPhoto/FullPhoto';

interface IProps extends RouteComponentProps {
}

interface IState {

}

class Gallery extends Component<IProps, IState> {
  render() {
    return (
      <div className="Gallery">
        <Switch>
          <Route path={this.props.match.url + '/:id'} exact component={FullPhoto} />
          <Route path="/" component={Photos} />
        </Switch>

        {/* <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-photo'
                  }}
                >
                  New Photo
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route render={() => <h1>Not found </h1>} />
        </Switch> */}
      </div>
    );
  }
}

export default Gallery;