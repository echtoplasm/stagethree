import { useState } from 'react';
import { X } from 'lucide-react';
import { createStage, type Stage } from '../../../api/stages';
import { useAuth } from '../../../contexts/AuthContext';
import { ErrorMessage } from '../../../components/userUI/ErrorMessage';


interface StageCreateProps {
  venueId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function StageCreate({ venueId,  onClose, onSuccess }: StageCreateProps) {
  //AUTH CHECK
  const { user } = useAuth();
  if (!user) return null

  //STATE MANAGEMENT
  const [stageForm, setStageForm] = useState<Omit<Stage, 'id'>>({
    venueId: venueId,
    name: '',
    width: 0,
    depth: 0,
    height: 0,
    createdBy: user.id,
    isPublic: false,
  });

  const [error, setError] = useState<string | null>(null);


  //submission handler with error state set
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await createStage(stageForm);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Missing One or 2 fields for form submission')
    }
  };

  //JSX component return
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

        {/*error component*/}
        {error && (
          <ErrorMessage error={error} />
        )}

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
