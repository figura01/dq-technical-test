import React, {useEffect, useState} from 'react';
import { Outlet } from 'react-router-dom'
import TeamList from '../../components/teams/TeamList';
import service from "../../api/service";
import classes from './Teams.module.css';

const Teams = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsDb = await service.getAll("api/teams")

      setTeams(teamsDb)
      setIsLoading(false)
    }
    fetchTeams()
  }, [])

  return (
    <div className={classes.teams}>
      {!isLoading && <TeamList teams={teams}/> }
      <div className={classes.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Teams;