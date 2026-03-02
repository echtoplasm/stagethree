import { useState, useEffect } from 'react';
import { fetchAllProjectByUserId, type Project } from '../api/projects';
import { useAuth } from '../contexts/AuthContext';

export const UserPortal = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return null;
    const data = await fetchAllProjectByUserId(user.id)
    setProjects(data);
  }

  useEffect(() => {
    fetchProjects;
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
        <div>
          {projects.map((proj) => (
            <div className="card">
              <p>{proj.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
