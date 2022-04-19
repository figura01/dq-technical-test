import React from "react";
import Icon from '@mui/material/Icon';
import { Link } from "react-router-dom";
import service from '../../api/service';

import classes from './Detail.module.css';

const Detail = ({user}) => {

  return (
    <div className={classes["detail"]}>
      <div className={classes["header-detail"]}>
        <h3>User detail</h3>
        <Link to="edit">
          <Icon>edit</Icon>
        </Link>
      </div>

      <div className={classes["detail-content"]}>
        <div className={classes.information}>
          <h4>Information</h4>
          <div className={classes.info}>
            <p className={classes.label}>First name</p>
            <p className={classes.entre}>{user.firstName}</p>
          </div>

          <div className={classes.info}>
          <p className={classes.label}>Lastt name</p>
          <p className={classes.entre}>{user.lastName}</p>
          </div>

          <div className={classes.info}>
          <p className={classes.label}>Email</p>
          <p className={classes.entre}>{user.email}</p>
          </div>

          <div className={classes.info}>
          <p className={classes.label}>Role</p>
          <p className={classes.entre}>{user.role}</p>
          </div>
        </div>

        <div className="Teams">
          <h4>Teams</h4>
          <div className={classes.info}>
            <p className={classes.entre}></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;