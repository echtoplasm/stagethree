import { useState } from 'react';
import {  createStage, type Stage } from '../../../api/stages';

export function StageCreate() {
  const [stageForm, setStageForm] = useState<Omit<Stage, 'id'>>({
    name: '',
    width: 0,
    depth: 0,
    height: 0
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createStage(stageForm);
  }


  return (
    <div className="page-container">
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Create Stage</h1>
          <p className="text-secondary">Fill out the form below to create a stage</p>
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

          <button type="submit">Create Stage</button>
        </form>
      </div>
    </div>
  );
}
