import React, { useEffect, useState } from 'react'
import CreateForm from '../../components/teams/CreateForm'
import service from '../../api/service';

const NewTeam = () => {
  const [teams, setTeams] = useState(null)
  const [users, setUsers] = useState(null)
  const [isLoadingTeams, setIsLoadingTeams] = useState(true)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsDb = await service.getAll("api/teams")
      setTeams(teamsDb)
      setIsLoadingTeams(false)
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const usersDb = await service.getAll("api/users")
      console.log(usersDb)
      setUsers(usersDb)
      setIsLoadingUsers(false)
    }
    fetchUsers()
  }, [])
  return <div>
    {!isLoadingTeams && !isLoadingUsers && <CreateForm teams={teams} users={users} /> }
  </div>
}

export default NewTeam;