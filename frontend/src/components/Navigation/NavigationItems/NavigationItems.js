import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Stock Photography
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/new-photo">New Photo</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Log in</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
    <NavigationItem link="/new-photo">
      Logged as: {props.currentUser}
    </NavigationItem>
    <NavigationItem link="/my-photos">My photos</NavigationItem>
  </ul>
);

export default navigationItems;
