import { useState } from 'react';
import { X } from 'lucide-react';
import { type Stage, updateStage } from '../../../api/stages';

interface StageUpdateProps {
  stage: Stage;
  onClose: () => void;
}


export function StageUpdate({ stage, onClose }: StageUpdateProps) {
  const [stageForm, setStageForm] = useState<Stage>({
    id: stage.id,
    name: stage.name,
    width: stage.width,
    depth: stage.depth,
    height: stage.height
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateStage(stageForm.id, stageForm);
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
