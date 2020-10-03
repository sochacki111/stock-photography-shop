import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// TODO Gallery as Photos container
class Gallery extends Component {
  render() {
    return (
      <div className="Gallery">
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
