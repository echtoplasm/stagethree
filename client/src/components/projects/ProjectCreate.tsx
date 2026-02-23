import {useState} from "react";
import { createNewProject } from "../../api/projects";
import { useAuth } from "../../contexts/AuthContext";
import { type Project } from "../../api/projects";
import {X} from 'lucide-react';

interface ProjectCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ProjectCreate = ({onClose, onSuccess}: ProjectCreateProps) => {
  const {user} = useAuth();
  if(!user) return null;
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    name: '',
    userId: user.id,
    description: '', 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewProject(projectForm);
    onSuccess();
  }

return(
   <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Create Project</h2>
            <p className="text-secondary">Fill out the form below to create a project</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Project Name</label>
            <input id="name" className="form-input" type="text" value={projectForm.name}
              onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <input id="description" className="form-input" type="text" value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
          </div>


          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Project</button>
          </div>
        </form>
      </div>
    </>
  )
}
