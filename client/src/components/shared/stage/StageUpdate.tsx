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
    <div className="page-container">
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Update Stage</h1>
          <p className="text-secondary">Fill out the form below to create a stage</p>
        <X onClick={onClose} size={16}/>
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Stage Name</label>
          <input
            id="name"
            type="text"
            value={stageForm.name}
            onChange={(e) => setStageForm({ ...stageForm, name: e.target.value })}
          />

          <label htmlFor="width">Width</label>
          <input
            id="width"
            type="number"
            value={stageForm.width}
            onChange={(e) => setStageForm({ ...stageForm, width: Number(e.target.value) })}
          />

          <label htmlFor="height">Height</label>
          <input
            id="height"
            type="number"
            value={stageForm.height}
            onChange={(e) => setStageForm({ ...stageForm, height: Number(e.target.value) })}
          />

          <button type="submit">Update Stage</button>
        </form>
      </div>
    </div>
  );
}
