import { useState, useEffect } from "react";
import { createStagePlot } from "../../api/stagePlots";
import { type StagePlot } from "../../api/stagePlots";
import { type Stage } from "../../api/stages";
import { X } from 'lucide-react';
import { fetchAllStages } from "../../api/stages";

interface PlotCreateProps {
  onClose: () => void;
  onSuccess: () => void;
  projectId: number;
}

export const PlotCreate = ({ onClose, onSuccess, projectId }: PlotCreateProps) => {
  


  const [stages, setStages] = useState<Stage[]>([]);
  const [stagePlotForm, setStagePlotForm] = useState<Omit<StagePlot, 'id' | 'createdAt'>>({
    projectId: projectId,
    stageId: 0,
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStagePlot(stagePlotForm);
    onSuccess();
  }

  useEffect(() => {
    const fetchStages = async () => {
      const stageArr = await fetchAllStages();
      setStages(stageArr);
    }

    fetchStages();
  }, [])


  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Create StagePlot</h2>
            <p className="text-secondary">Fill out the form below to create a StagePlot</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <select onChange={(e) => setStagePlotForm({
            ...stagePlotForm,
            stageId:  e.target.value ? parseInt(e.target.value) : undefined })}>
          <option value="">Select a stage</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <input id="description" className="form-input" type="text" value={stagePlotForm.name}
            onChange={(e) => setStagePlotForm({ ...stagePlotForm, name: e.target.value })} />
        </div>


        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create StagePlot</button>
        </div>
      </form>
    </div >
    </>
  )
}
