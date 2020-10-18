import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Stock Photography</NavigationItem>
    <NavigationItem link="/photos" exact>Photos</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/new-photo">New Photo</NavigationItem> : null}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Log in</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navigationItems;