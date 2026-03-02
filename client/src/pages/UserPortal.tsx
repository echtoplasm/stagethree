import { useState, useEffect } from 'react';
import { fetchAllProjectByUserId, type Project } from '../api/projects';
import { type Stage } from '../api/stages'
import { useAuth } from '../contexts/AuthContext';
import { getStagesByUserId } from '../api/stages';


export const UserPortal = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return null;
    const data = await fetchAllProjectByUserId(user.id)
    setProjects(data);
    console.log(projects);
  }

  const fetchStagesForUser = async () => {
    if (!user) return null;
    const data = await getStagesByUserId(user.id);
    setStages(data);
    console.log(stages);
  }

  useEffect(() => {
    fetchProjects();
    fetchStagesForUser();
  }, [user])

  return (
    <>
      <div>
        <div>
          <h2>Hello, {user?.firstName}</h2>
          <span className='text-secondary text-small'>Stay awhile</span>
        </div>
        <div>
          <h2>Change options</h2>
          <p>So here I am thinking about adding the option for a user to see what venues they've uploaded</p>
          <p>This would require updating my schema, and adding the option for users to upload their own venues/stages</p>
        </div>
        {/*** TODO ADD styling maybe like a table or something ***/}
        <div>
          {projects.length > 0 && projects.map((proj) => (
            <div key={proj.id}>
              <p>{proj.name}</p>
            </div>
          ))}
        </div>
        <div>
          { stages.length > 0 && stages.map((stage) => (
            <div className='card' key={stage.id}>
              <p>{stage.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
