
import { useAuth } from '../contexts/AuthContext';
import { StageTable } from '../components/shared/stage/StageTable';
import { ProjectTable } from '../components/shared/projects/ProjectTable';

export const UserPortal = () => {
  const { user } = useAuth();

  return (
    <div className='page-container'>
      <div className='content-wrapper'>
        <div className='mb-8'>
          <h2>Hello, {user?.firstName}</h2>
          <span className='text-secondary text-small'>Stay awhile</span>
          <div className='card'>
            <p>User Information</p>
            <p>email: {user?.email}</p>
            <p>first name: {user?.firstName}</p>
            <p>last name: {user?.lastName}</p>
          </div>
        </div>
        <div className='mb-8 card'>
          <ProjectTable />
        </div>
        <div className='mb-8 card'>
          <StageTable />
        </div>
      </div>
    </div>
  )
}
