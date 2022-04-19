import React, {useEffect, useState} from 'react';
import Detail from '../../components/users/Detail'
import { useParams } from 'react-router-dom'
import service from '../../api/service';


const User = () => {
  const {userId} = useParams()
  const [user, setUser] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const userDb = await service.getOne("api/users", userId)
      setUser(userDb)
      setIsLoadingUser(false)
    }
    fetchUser()
  }, [userId])


  return <div>
    {!isLoadingUser && <Detail user={user} /> }
  </div>
}

export default User