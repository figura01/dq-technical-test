import React from 'react';

import Icon from '@mui/material/Icon';

import classes from './SubMenu.module.css';
import{ NavLink } from 'react-router-dom';
const SubMenu = () => {
  let activeClassName = "underline";
  let activeStyle = {
    color: '#615dd8',
  };
  return (
    <ul className={classes['main-menu']}>
      
      <li>
        <NavLink to="/users" style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          <Icon className={classes.icon_menu}>person_search</Icon>
        </NavLink>
      </li>
      <li>
        <NavLink to="/teams" style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
         <Icon className={classes.icon_menu}>groups</Icon>
        </NavLink>
        </li>
    </ul>
  )
}

export default SubMenu;