
import { type Stage, deleteStage } from '../../../api/stages';

interface StageDeleteProps {
  stage: Stage;
  onClose: () => void;
}

/**
 * Confirmation modal for deleting a stage.
 *
 * @param stage - The stage to be deleted.
 * @param onClose - Callback invoked when the modal is dismissed or the deletion completes.
 * @returns The delete confirmation modal.
 */
export function StageDelete({ stage, onClose }: StageDeleteProps) {

  /** Deletes the stage by ID and calls onClose on completion. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteStage(stage.id);
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
            <h2>Delete Stage?</h2>
            <p className="text-danger">Are you sure you want to delete stage?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>No, Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div >
    </>
  );
}
