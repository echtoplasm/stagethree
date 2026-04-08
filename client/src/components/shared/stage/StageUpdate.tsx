import { useState } from 'react';
import { X } from 'lucide-react';
import { type Stage, updateStage } from '../../../api/stages';

interface StageUpdateProps {
  stage: Stage;
  onClose: () => void;
}

/**
 * Modal form for updating an existing stage's name, dimensions, and visibility.
 * Initializes form state from the provided stage and calls onClose after a successful update.
 *
 * @param stage - The stage to edit, used to seed initial form state.
 * @param onClose - Callback invoked when the modal is dismissed or the update completes.
 * @returns The update stage modal with name, dimension, and visibility fields.
 */
export function StageUpdate({ stage, onClose }: StageUpdateProps) {
  const [stageForm, setStageForm] = useState<Stage>({
    id: stage.id,
    venueId: stage.venueId,
    name: stage.name,
    width: stage.width,
    depth: stage.depth,
    height: stage.height,
    createdBy: stage.createdBy,
    isPublic: stage.isPublic
  });

  /** Submits the updated stage form and calls onClose on completion. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStage(stageForm.id, stageForm);
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
            <h2>Update Stage</h2>
            <p className="text-secondary">Edit the stage dimensions and name</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Stage Name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={stageForm.name}
              onChange={(e) => setStageForm({ ...stageForm, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="width">Width (ft)</label>
            <input
              id="width"
              className="form-input"
              type="number"
              value={stageForm.width}
              onChange={(e) => setStageForm({ ...stageForm, width: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="depth">Depth (ft)</label>
            <input
              id="depth"
              className="form-input"
              type="number"
              value={stageForm.depth}
              onChange={(e) => setStageForm({ ...stageForm, depth: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="height">Height (ft)</label>
            <input
              id="height"
              className="form-input"
              type="number"
              value={stageForm.height}
              onChange={(e) => setStageForm({ ...stageForm, height: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Visibility</label>
            <div className="flex gap-4">
              <label className="flex gap-2 font-medium" style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="isPublic"
                  value="true"
                  checked={stageForm.isPublic === true}
                  onChange={() => setStageForm({ ...stageForm, isPublic: true })}
                />
                Public
              </label>
              <label className="flex gap-2 font-medium" style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="isPublic"
                  value="false"
                  checked={stageForm.isPublic === false}
                  onChange={() => setStageForm({ ...stageForm, isPublic: false })}
                />
                Private
              </label>
            </div>
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
