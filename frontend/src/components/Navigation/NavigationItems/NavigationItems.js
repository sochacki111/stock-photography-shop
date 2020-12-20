import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Stock Photography
    </NavigationItem>
    {props.isAuthenticated ? (
      <Auxiliary>
        <NavigationItem link="/new-photo">Upload photo</NavigationItem>
        <NavigationItem link="/my-photos">My photos</NavigationItem>
        <li>Logged as: {props.currentUser}</li>
        {/* <NavigationItem link="/new-photo">
          Logged as: {props.currentUser}
        </NavigationItem> */}
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Auxiliary>
    ) : (
      <NavigationItem link="/auth">Log in</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
