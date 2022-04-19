import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <Link to="/">
        <h1 className={classes.brand}>Brand</h1>
      </Link>
    </div>
  )
}

export default Navbar;