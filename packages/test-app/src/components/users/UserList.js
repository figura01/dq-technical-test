import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Icon from '@mui/material/Icon';
import classes from './UserList.module.css';

const UserItem = ({onSelect, selectedItem, user}) => {
  
  return (
    <Link to={`/users/${user._id}`} className={user._id === selectedItem ? `${classes['button-link']} ${classes.active}`: `${classes['button-link']}`} onClick={(e) => onSelect(user._id)} >
      <div className={classes.user}>
        <div className={classes.icon}><Icon>person</Icon></div>
        <div className={classes.content}>
          <p>{`${user.firstName} ${user.lastName} (${user.role})`}</p>
          <p>{user.email}</p>
        </div>
        <div className={classes.icon}><Icon>arrow_forward_ios_icon</Icon></div>
      </div>
    </Link>
  )
}

const UserList = ({users}) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const handleClick = (itemId) => {
    console.log('click item', itemId)
    setSelectedItem(itemId)
  }
  return (
    <div className={classes["user-list"]}>
      <div className={classes["header-list"]}>
        <h3>User List</h3>
        <Link to="create">
          <Icon className="test">person_add</Icon>
        </Link>
      </div>
      {users.length === 0 && <p>No users founded</p>}
      {users.length > 0 && users.map(u => {
        return <UserItem key={u._id} user={u} onSelect={handleClick} selectedItem={selectedItem}/>
      })}
    </div>
  )
}

export default UserList;