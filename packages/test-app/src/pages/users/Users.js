import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import UserList from '../../components/users/UserList';
import service from "../../api/service";

import classes from './Users.module.css';

const Users = () => {
  
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const usersDb = await service.getAll("/api/users")
      setUsers(usersDb)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className={classes.users}>
      {!isLoading && <UserList users={users}/> }
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Users