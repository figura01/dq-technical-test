import React, {useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import service from '../../api/service';

import UserList from '../../components/users/UserList'
import Detail from '../../components/users/Detail';

import classes from './UserDetail.module.css';
const UserDetail = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const { idUser } = useParams();
  console.log( idUser )

  useEffect(() => {
    const fetchUser = async () => {
      const userDb = await service.getOne("api/users", idUser)
      setUser(userDb)
      setIsLoading(false)
      console.log(userDb)
    }
    fetchUser()
  }, [idUser])

  return (

    <div className={classes["user-detail"]}>
      
      {!isLoading && <Detail user={user}/> }
    </div>  

  )
}

export default UserDetail;