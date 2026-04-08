import { deleteProject } from '../../../api/projects';
import { createPortal } from 'react-dom';

interface ProjectDeleteProps {
  projectId: number;
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * Portal-rendered confirmation modal for deleting a project.
 * Returns null if no projectId is provided.
 *
 * @param projectId - The ID of the project to delete.
 * @param onSuccess - Callback invoked after the project is successfully deleted.
 * @param onClose - Callback invoked when the modal is dismissed.
 * @returns A confirmation modal portal mounted to document.body.
 */
export function ProjectDeletePortal({ projectId, onSuccess, onClose }: ProjectDeleteProps) {

  if (!projectId) return null;
  
  /** Deletes the project by ID and calls onSuccess on completion. */
  const handleDelete = async () => {
    await deleteProject(projectId);
    onSuccess();
  }


  return createPortal(
    <>
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
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>Yes, Delete</button>
        </div>
      </div>
    </>, document.body
  );
}
