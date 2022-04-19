import React from "react";
import Icon from '@mui/material/Icon';
import { Link } from "react-router-dom";
import service from '../../api/service';

import classes from './Detail.module.css';

const PersonItem = ({user}) => {
  return <div className={classes.person}>
    <div className={classes['person-info']}>
      <Icon>person</Icon>
      <div className={classes.info}>
        <p className={classes.label}>{user.firstName} {user.lastName}</p>
        <p className={classes.entre}>{user.email}</p>
      </div>
    </div>
    <div>
    <Link to={`/users/${user._id}`} className={classes['link-detail']}>
      <Icon>open_in_new</Icon>
    </Link>
    </div>
  </div>
}


const Detail = ({team}) => {
  console.log(team)

  return (
    <div className={classes["detail"]}>
      <div className={classes["header-detail"]}>
        <h3>Team detail</h3>
        <Link to="edit">
          <Icon>edit</Icon>
        </Link>
      </div>

      <div className={classes["detail-content"]}>
        <div className={classes.information}>
          <h4>Information</h4>
          <div className={classes.info}>
            <p className={classes.label}>Team</p>
            <p className={classes.entre}>{team.name}</p>
          </div>

          <h4>Persons</h4>
          <div>
            <h5>Leader</h5>
            {team.userIds.filter((u) => u.role === 'SQUAD_LEADER').map((u) => (  
              <PersonItem user={u} />
            ))}
          </div>
          <div>
            <h5>Members</h5>
            {team.userIds.filter((u) => u.role === 'SQUAD_MEMBER').map((u) => (  
              <PersonItem user={u} />
            ))}
          </div>
          <div>
            <h5>Interns</h5>
            {team.userIds.filter((u) => u.role === 'INTERN').map((u) => (  
              <PersonItem user={u} />
            ))}
          </div>
          
        </div>

        
      </div>
    </div>
  )
}

export default Detail;