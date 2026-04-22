import { useState } from 'react';
import { StageTable } from "../components/shared/stage/StageTable";
import { UserTable } from "../components/admin/UserTable";
import { ImageTable } from "../components/admin/3dModels/ModelTable";

type AdminTab = 'users' | 'stages' | 'models';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  return (
    <div className="page-container">
      <header className="content-wrapper mb-8">
        <h1>Admin Dashboard</h1>
        <p className="text-secondary">Manage users, stages, and 3D models</p>
      </header>
      <div className="content-wrapper">
        <div className="tab-bar mb-8">
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab ${activeTab === 'stages' ? 'active' : ''}`}
            onClick={() => setActiveTab('stages')}
          >
            Stages
          </button>
          <button
            className={`tab ${activeTab === 'models' ? 'active' : ''}`}
            onClick={() => setActiveTab('models')}
          >
            3D Models
          </button>
        </div>

        {activeTab === 'users' && <UserTable />}
        {activeTab === 'stages' && <StageTable />}
        {activeTab === 'models' && <ImageTable />}
      </div>
    </div>
  );
};

