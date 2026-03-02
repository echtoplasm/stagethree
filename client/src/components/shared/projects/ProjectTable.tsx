import { useState, useEffect } from 'react';
import { Box, Trash, Plus } from 'lucide-react';
import { type Project } from '../../../api/projects';
import { fetchAllProjectByUserId } from '../../../api/projects';
import { ProjectUpdate } from './ProjectUpdate';
import { ProjectDeletePortal } from './ProjectDelete';
import { ProjectCreate } from './ProjectCreate';
import { useAuth } from '../../../contexts/AuthContext';

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [deleteProject, setProjectDelete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectCreate, setProjectCreate] = useState(false);

  const { user } = useAuth();
  if (!user) return null;

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProjectByUserId(user.id);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects for user');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading projects</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex-center">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Manage Projects</h1>
          <p className="text-secondary">Select a project to delete</p>
          <button className="btn btn-primary" onClick={() => setProjectCreate(true)}>
            <Plus size={18} />
            Create New Project
          </button>
        </header>
        {projects.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No project templates found</p>
          </div>
        ) : (
          <div className='card'>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.createdAt}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setSelectedProject(project)
                          setProjectDelete(true)
                        }}
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-sm'
                        onClick={() => {
                          setSelectedProject(project)
                          setUpdate(true)
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {update && selectedProject && (
        <ProjectUpdate
          project={selectedProject}
          onClose={() => {
            setUpdate(false);
            setSelectedProject(null);
          }}
        />
      )}

      {deleteProject && selectedProject && (
        <ProjectDeletePortal
          projectId={selectedProject.id}
          onSuccess={async () => {
            const data = await fetchAllProjectByUserId(user.id);
            setProjects(data);
            setProjectDelete(false);
          }}
          onClose={() => {
            setProjectDelete(false);
            setSelectedProject(null);
          }}

        />
      )}

      {projectCreate && (
        <ProjectCreate
          onSuccess={async () => {
            const data = await fetchAllProjectByUserId(user.id);
            setProjects(data);
            setProjectCreate(false);
          }}
          onClose={() => setProjectCreate(false)}
        />
      )}
    </div >
  );
}
