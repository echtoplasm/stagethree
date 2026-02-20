import { deleteProject } from '../../api/projects';

interface ProjectDeleteProps {
  projectId: number | null;
  onSuccess: () => void;
  onClose: () => void;
}


export function ProjectDelete({ projectId, onSuccess, onClose }: ProjectDeleteProps) {

  if (!projectId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    deleteProject(projectId);
    onSuccess();
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
            <h2>Delete Project?</h2>
            <p className='text-secondary'>Are you sure you want to delete project?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>No, Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div>
    </>
  );
}
