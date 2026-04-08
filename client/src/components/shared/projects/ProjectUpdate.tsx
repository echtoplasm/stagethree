import { useState } from 'react';
import { X } from 'lucide-react';
import { type Project, updateProject } from '../../../api/projects';
import { createPortal } from 'react-dom';
interface ProjectUpdateProps {
  project: Project;
  onClose: () => void;
}

/**
 * Portal-rendered modal form for updating an existing project's name and description.
 * Initializes form state from the provided project and calls onClose after a successful update.
 *
 * @param project - The project to edit, used to seed initial form state.
 * @param onClose - Callback invoked when the modal is dismissed or the update completes.
 * @returns An update modal portal mounted to document.body.
 */
export function ProjectUpdate({ project, onClose }: ProjectUpdateProps) {
  const [projectForm, setProjectForm] = useState<Project>({
    id: project.id,
    userId: project.userId,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  });

  /** Submits the updated project form and calls onClose on completion. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject(projectForm.id, projectForm);
    onClose();
  }


  return createPortal(
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
    </>, document.body
  );
}
