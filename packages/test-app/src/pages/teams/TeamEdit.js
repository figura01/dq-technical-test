import React, {useEffect, useState} from 'react';

import EditForm from '../../components/teams/EditForm';
import TeamList from '../../components/teams/TeamList';
import service from '../../api/service';

import classes from './TeamEdit.module.css';

const TeamEdit = () => {
  const [users, setUsers] = useState(null)
  const [teams, setTeams] = useState(null)
  const [isLoadedUsers, setIsLoadedUsers] = useState(true)
  const [isLoadedTeams, setIsLoadedTeams] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsDb = await service.getAll("api/teams")
      console.log(teamsDb)
      setTeams(teamsDb)
      setIsLoadedTeams(false)
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const usersDb = await service.getAll("api/users")
      console.log(usersDb)
      setUsers(usersDb)
      setIsLoadedUsers(false)
    }
    fetchUsers()
  }, [])

  return (
    <div className={classes["team-edit"]}>
      {!isLoadedTeams && <TeamList teams={teams}/> }
      {!isLoadedTeams && !isLoadedUsers && <EditForm teams={teams} users={users}/>}
    </div>
  )
}

export default TeamEdit;