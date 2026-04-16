import { useState, useEffect } from "react";
import { createStagePlot, type StagePlot, fetchFullStagePlotConfig } from "../../api/stagePlots";
import { X } from 'lucide-react';
import { createPortal } from "react-dom";
import { ErrorMessage } from "../userUI/ErrorMessage";
import { fetchAllProjectByUserId, type Project } from "../../api/projects";
import { useAuth } from "../../contexts/AuthContext";
import { useStageContext } from "../../contexts/StageContext";
import type { PublicStage } from "../../api/stages";

interface PlotCreateFromPublicStageProps {
  onClose: () => void;
  onSuccess: () => void;
  stage: PublicStage;
}

/**
 * Component for creating a plot from a public stage template.
 * Accepts a pre-selected stageId and allows the user to select a project,
 * name the plot, and optionally add a gig date.
 *
 * @param onClose - callback fired when the modal is dismissed
 * @param onSuccess - callback fired after successful plot creation
 * @param stageId - the id of the public stage to create the plot against
 *
 * @returns A portal-rendered modal form for creating a stage plot
 */
export const PlotCreateFromPublicStage = ({ onClose, onSuccess, stage }: PlotCreateFromPublicStageProps) => {
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gigDateBool, setGigDateBool] = useState(false);
  const [stagePlotForm, setStagePlotForm] = useState<Omit<StagePlot, 'id' | 'createdAt'>>({
    projectId: 0,
    stageId: stage.id,
    name: '',
    gigDate: '',
    stagePlotUUID: crypto.randomUUID(),
  });

  const { user } = useAuth();
  const {setStagePlot, setStage, setElementPlacements, setInputChannels, setActiveProject} = useStageContext();
  useEffect(() => {
    const loadProjects = async () => {
      if(!user) return null;
      try {
        const data = await fetchAllProjectByUserId(user.id);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      }
    };
    loadProjects();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const plot = await createStagePlot(stagePlotForm);
    if (!plot.id) return;
    const fullConfig = await fetchFullStagePlotConfig(plot.id);
    setElementPlacements(fullConfig.elements);
    setInputChannels(fullConfig.inputChannels);
    setStage(fullConfig.stage);
    setActiveProject(fullConfig.project);
    setStagePlot(fullConfig.stagePlot);
    onSuccess();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Missing one or more required fields');
  }
};

  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Use This Stage</h2>
            <p className="text-secondary">Create a new plot from this stage template</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && <ErrorMessage error={error} />}

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="project-select">Project</label>
            <select
              id="project-select"
              className="form-input"
              value={stagePlotForm.projectId || ''}
              onChange={e => setStagePlotForm(prev => ({
                ...prev,
                projectId: parseInt(e.target.value)
              }))}
            >
              <option value="">Select a project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
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
              onChange={e => setStagePlotForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="bool-gig-date">Add Gig Date?</label>
            <input
              id="bool-gig-date"
              type="checkbox"
              checked={gigDateBool}
              onChange={e => setGigDateBool(e.target.checked)}
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
                onChange={e => setStagePlotForm(prev => ({ ...prev, gigDate: e.target.value }))}
              />
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Plot</button>
          </div>
        </form>
      </div>
    </>, document.body
  );
};
