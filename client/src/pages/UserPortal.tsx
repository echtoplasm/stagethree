import { useAuth } from '../contexts/AuthContext';
import { StageTable } from '../components/shared/stage/StageTable';
import { ProjectTable } from '../components/shared/projects/ProjectTable';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {VenueTable} from '../components/shared/venues/VenueTable'

export const UserPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <div className='page-container'>
      <div className='content-wrapper'>

        <header className='mb-8'>
          <h1>Welcome back, {user?.firstName}</h1>
          <p className='text-secondary'>Stay awhile</p>
        </header>

        <div className='card mb-8'>
          <div className='card-header'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={24} />
              <h3>Account</h3>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p className='text-secondary'>
              <span className='text-primary'>User First/Last: {user?.firstName} {user?.lastName}</span>
            </p>
            <p className='text-secondary'>Email :{user?.email}</p>
          </div>
        </div>

        <div className='mb-8'>
          <ProjectTable />
        </div>

        <div className='mb-8'>
          <StageTable />
        </div>

        <div>
          <VenueTable />
        </div>

      </div>
    </div>
  );
};
