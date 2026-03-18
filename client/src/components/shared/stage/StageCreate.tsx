import { useState } from 'react';
import { X } from 'lucide-react';
import { createStage, type Stage } from '../../../api/stages';
import { useAuth } from '../../../contexts/AuthContext';
interface StageCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function StageCreate({ onClose, onSuccess }: StageCreateProps) {
  const { user } = useAuth();
  if (!user) return null
  const [stageForm, setStageForm] = useState<Omit<Stage, 'id'>>({
    name: '',
    width: 0,
    depth: 0,
    height: 0,
    createdBy: user.id,
    isPublic: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStage(stageForm);
    onSuccess();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Create Stage</h2>
            <p className="text-secondary">Fill out the form below to create a stage</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Stage Name</label>
            <input id="name" className="form-input" type="text" value={stageForm.name}
              onChange={(e) => setStageForm({ ...stageForm, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="width">Width (ft)</label>
            <input id="width" className="form-input" type="number" value={stageForm.width}
              onChange={(e) => setStageForm({ ...stageForm, width: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="depth">Depth (ft)</label>
            <input id="depth" className="form-input" type="number" value={stageForm.depth}
              onChange={(e) => setStageForm({ ...stageForm, depth: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="height">Height (ft)</label>
            <input id="height" className="form-input" type="number" value={stageForm.height}
              onChange={(e) => setStageForm({ ...stageForm, height: Number(e.target.value) })} />
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
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Stage</button>
          </div>
        </form>
      </div>
    </>
  );
}
