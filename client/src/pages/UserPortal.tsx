
import { useAuth } from '../contexts/AuthContext';
import { StageTable } from '../components/shared/stage/StageTable';
import {ProjectTable } from '../components/shared/projects/ProjectTable'; 

export const UserPortal = () => {
  const { user } = useAuth();

  return (
    <div className='page-container'>
      <div className='content-wrapper'>
        <div>
          <h2>Hello, {user?.firstName}</h2>
          <span className='text-secondary text-small'>Stay awhile</span>
        </div>
        <div className='mb-8'>
          <StageTable />
        </div>
        <div>
          <ProjectTable />
        </div>
      </div>
    </div>
  )
}
