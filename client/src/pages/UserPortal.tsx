import { useAuth } from '../contexts/AuthContext';
import { ProjectTable } from '../components/shared/projects/ProjectTable';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VenueTable } from '../components/shared/venues/VenueTable';
import { UserUpdate } from '../components/admin/UserUpdate';

type PortalTab = 'projects' | 'venues';

/**
 * Authenticated user portal displaying account info, projects, and venues.
 * Redirects to the home page if the user is not authenticated.
 *
 * @returns The user portal layout with account details, ProjectTable, and VenueTable.
 */
export const UserPortal = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState<PortalTab>('projects');

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>{user?.firstName}'s User Portal</h1>
          <p className="text-secondary">Manage your user information, and stage data here.</p>
        </header>

        <div className="card mb-8">
          <div className="card-header">
            <div className="flex-between">
              <div className="flex gap-2">
                <User size={24} />
                <h2>Account</h2>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setUpdate(true)}>
                Update Account
              </button>
            </div>
          </div>
          <div className="portal-account-info">
            <p className="text-secondary">
              <span className="text-primary">{user?.firstName} {user?.lastName}</span>
            </p>
            <p className="text-secondary">{user?.email}</p>
          </div>
        </div>

        <div className="tab-bar mb-8">
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab ${activeTab === 'venues' ? 'active' : ''}`}
            onClick={() => setActiveTab('venues')}
          >
            Venues
          </button>
        </div>

        {activeTab === 'projects' && <ProjectTable />}
        {activeTab === 'venues' && <VenueTable />}
      </div>

      {update && (
        <UserUpdate
          userUpdate={user}
          onClose={() => setUpdate(false)}
          onSuccess={(updatedUser) => {
            updateUser(updatedUser);
            setUpdate(false);
          }}
        />
      )}
    </div>
  );
};
