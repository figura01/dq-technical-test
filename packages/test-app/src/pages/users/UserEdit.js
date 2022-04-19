import React, { useState, useEffect } from "react";
import UserList from '../../components/users/UserList';
import Edit from '../../components/users/EditForm'
import service from "../../api/service";
import classes from './UserEdit.module.css';

const UserEdit = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const usersDb = await service.getAll("/api/users")
      setUsers(usersDb)
      setIsLoading(false)
      console.log(usersDb)
    }
    fetchData()
  }, [])

  return (
    <div className={classes["user-edit"]}>
      <UserList users={users} />
      <Edit />
    </div>
  )
}

export default UserEdit;