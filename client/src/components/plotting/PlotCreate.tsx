import { useState, useEffect } from "react";
import { createStagePlot } from "../../api/stagePlots";
import { type StagePlot } from "../../api/stagePlots";
import { type Stage } from "../../api/stages";
import { X } from 'lucide-react';
import { getStagesByVenueId } from "../../api/stages";
import { createPortal } from "react-dom";
import { ErrorMessage } from "../userUI/ErrorMessage";
import { fetchAllVenues, type Venue } from "../../api/venues";
import { useNavigate } from "react-router-dom";

interface PlotCreateProps {
  onClose: () => void;
  onSuccess: () => void;
  projectId: number;
}


/**
 * Component for creating a plot and passing the related form data to the backend
 * 
 * @param  - onClose react props callback function for determining what happens on comp close
 * @param  - onSuccess react prop callback function for determining what happens on comp success
 * @param  - projectId the project id to associate the new plot with
 *
 * @returns - JSX containing the form to create a new stage plot
 */
export const PlotCreate = ({ onClose, onSuccess, projectId }: PlotCreateProps) => {
  const [error, setError] = useState<string | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [gigDateBool, setGigDateBool] = useState(false);
  const [stagePlotForm, setStagePlotForm] = useState<Omit<StagePlot, 'id' | 'createdAt'>>({
    projectId: projectId,
    stageId: 0,
    name: '',
    gigDate: '',
    stagePlotUUID: crypto.randomUUID(),
  });

  const navigate = useNavigate();

  /**
   * Handles form submit and err catching, if success then pass form data to client/api plot create function
   * 
   * @param e - react form event 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStagePlot(stagePlotForm);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Missing One or 2 fields for form submission');
    }
  }

  /** 
   * Fetches venues using client/api fetchallvenues function and sets 
   * state in this component to have local access to venue array
   */
  const fetchVenues = async () => {
    const venArr = await fetchAllVenues();
    setVenues(venArr);
  }


  //fetch venues on component mount
  useEffect(() => {
    fetchVenues();
  }, []);

  //fetch stages based on change to selectedVenueId change, being passed in effects dependency array
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
            <h2>Create Stage Plot</h2>
            <p className="text-secondary">Fill out the form below to create a stage plot</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && <ErrorMessage error={error} />}

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">Venue</label>
            <select
              className="form-input"
              onChange={(e) => {
                setSelectedVenueId(parseInt(e.target.value));
                setStagePlotForm(prev => ({ ...prev, stageId: 0 }));
              }}
            >
              <option value="">Select a venue</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Stage</label>
            <select
              className="form-input"
              disabled={!selectedVenueId}
              onChange={(e) => setStagePlotForm(prev => ({
                ...prev,
                stageId: e.target.value ? parseInt(e.target.value) : 0
              }))}
            >
              <option value="">{selectedVenueId ? 'Select a stage' : 'Select a venue first'}</option>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>{stage.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="plot-name">Plot Name</label>
            <input
              id="plot-name"
              className="form-input"
              type="text"
              value={stagePlotForm.name}
              onChange={(e) => setStagePlotForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="bool-gig-date">Add Gig Date?</label>
            <input
              id="bool-gig-date"
              className="form-input"
              type="checkbox"
              checked={gigDateBool}
              onChange={(e) => setGigDateBool(e.target.checked)}
            />
          </div>

          {gigDateBool && (
            <div className="form-group">
              <label className="form-label" htmlFor="gig-date">Gig Date</label>
              <input
                id="gig-date"
                className="form-input"
                type="date"
                value={stagePlotForm.gigDate ?? ''}
                onChange={(e) => setStagePlotForm({ ...stagePlotForm, gigDate: e.target.value })}
              />
            </div>
          )}

          <div className="modal-footer">
            <p className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Not seeing your venue or stage?{' '}
              <button type="button" className="btn-link" onClick={() => { onClose(); navigate('/portal'); }}>
                Manage venues & stages
              </button>
            </p>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Stage Plot</button>
          </div>
        </form>
      </div>
    </>, document.body
  );
}
