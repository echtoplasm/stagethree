import { useState, useEffect } from "react";
import { createStagePlot } from "../../api/stagePlots";
import { type StagePlot } from "../../api/stagePlots";
import { type Stage } from "../../api/stages";
import { X } from 'lucide-react';
import { getStagesByVenueId } from "../../api/stages";
import { createPortal } from "react-dom";
import { ErrorMessage } from "../userUI/ErrorMessage";
import { fetchAllVenues, type Venue } from "../../api/venues";


interface PlotCreateProps {
  onClose: () => void;
  onSuccess: () => void;
  projectId: number;
}

export const PlotCreate = ({ onClose, onSuccess, projectId }: PlotCreateProps) => {
  const [error, setError] = useState<string | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [stagePlotForm, setStagePlotForm] = useState<Omit<StagePlot, 'id' | 'createdAt'>>({
    projectId: projectId,
    stageId: 0,
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStagePlot(stagePlotForm);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Missing One or 2 fields for form submission');
    }
  }

  const fetchVenues = async () => {
    const venArr = await fetchAllVenues();
    setVenues(venArr);
  }

  useEffect(() => {
    fetchVenues();
  }, []);


  useEffect(() => {
    if (!selectedVenueId) return;
    const fetchStages = async () => {
      const stageArr = await getStagesByVenueId(selectedVenueId);
      setStages(stageArr);
    }


    fetchStages();
  }, [selectedVenueId])


  return createPortal(
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

        {error && (
          <ErrorMessage error={error} />
        )}

        <form onSubmit={handleSubmit} className="modal-body">
          <select onChange={(e) => {
            setSelectedVenueId(parseInt(e.target.value))
            setStagePlotForm(prev => ({ ...prev, stageId: 0 }))
          }}>
            <option value="">Select a venue</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          <select onChange={(e) => setStagePlotForm({
            ...stagePlotForm,
            stageId: e.target.value ? parseInt(e.target.value) : undefined
          })} className="mb-8">
            <option value="" className="text-secondary">Select a stage</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id} className="text-secondary">
                {stage.name}
              </option>
            ))}
          </select>
          <div className="form-group">
            <label className="form-label" htmlFor="plot-name">Stage Plot Name</label>
            <input id="plot-name" className="form-input" type="text" value={stagePlotForm.name}
              onChange={(e) => setStagePlotForm({ ...stagePlotForm, name: e.target.value })} />
          </div>


          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create StagePlot</button>
          </div>
        </form>
      </div >
    </>, document.body
  )
}
