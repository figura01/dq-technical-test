import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Icon from '@mui/material/Icon';
import classes from './TeamList.module.css';

const TeamItem = props => {
  const { onSelect, selectedItem, team } = props;
  const isLeader = (u) => u.role === 'SQUAD_LEADER';
  const indexLeader = team.userIds.findIndex(isLeader)
  const leader = team.userIds[indexLeader]
 
  return (
    <li className={classes.team}>
      <Link to={`${team._id}`} className={team._id === selectedItem ? `${classes['button-link']} ${classes.active}`: `${classes['button-link']}`} onClick={(e) => onSelect(team._id)} >
        <div className={classes['team-inner']}>
          <div className={classes.icon}><Icon>group</Icon></div>
          <div className={classes.content}>
            <p>{team.name}</p>
            { leader && <p>Leader: {leader.firstName} {leader.lastName}</p> }
          </div>
          <div className={classes.icon}><Icon>arrow_forward_ios_icon</Icon></div>
        </div>
      </Link>
    </li>
  )
}

const TeamList = ({teams}) => {

  const [selectedItem, setSelectedItem] = useState(null)
  const handleClick = (itemId) => {
    setSelectedItem(itemId)
  }

  return (
    <div className={classes["teams"]}>
      <div className={classes["header"]}>
        <h3>Teams List</h3>
        <Link to="create">
          <Icon className="test">group_add</Icon>
        </Link>
      </div>
      <ul className={classes["team-list"]}>
        {teams && teams.length === 0 && <p>No Teams founded</p>}
        {teams && teams.length > 0 && teams.map(t => {
          return <TeamItem key={t._id} team={t} onSelect={handleClick} selectedItem={selectedItem}/>
        })}
      </ul>
    </div>
  )
}

export default TeamList;