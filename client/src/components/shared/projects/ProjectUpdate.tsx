import { useState } from 'react';
import { X } from 'lucide-react';
import { type Project, updateProject } from '../../../api/projects';

interface ProjectUpdateProps {
  project: Project;
  onClose: () => void;
}


export function ProjectUpdate({ project, onClose }: ProjectUpdateProps) {
  const [projectForm, setProjectForm] = useState<Project>({
    id: project.id,
    userId: project.userId,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject(projectForm.id, projectForm);
    onClose();
  }


  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Update Project</h2>
            <p className="text-secondary">Edit the project dimensions and name</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* PROJECT NAME */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Project Name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={projectForm.name}
              onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
            />
          </div>
          {/* PROJECT DESCRIPTION */}
          <div className="form-group">
            <label className="form-label" htmlFor="width">Description</label>
            <input
              id="width"
              className="form-input"
              type="text"
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
