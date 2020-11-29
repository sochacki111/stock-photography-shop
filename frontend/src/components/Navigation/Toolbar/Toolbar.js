import React from 'react';

import classes from './Toolbar.module.css';
// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} currentUser={props.currentUser} />
        </nav>
    </header>
);

export default toolbar;