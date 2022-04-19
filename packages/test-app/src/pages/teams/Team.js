import React, {useEffect, useState} from 'react';
import Detail from '../../components/teams/Detail'
import { useParams } from 'react-router-dom'
import service from '../../api/service';

const Team = () => {
  const {teamId} = useParams()
  const [team, setTeam] = useState(null)
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      const teamDb = await service.getOne("api/teams", teamId)
      setTeam(teamDb)
      setIsLoadingTeam(false)
    }
    fetchTeam()
  }, [teamId])

  return <div>
    {!isLoadingTeam && <Detail team={team} /> }
  </div>
}

export default Team