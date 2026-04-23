import { useState, useEffect } from "react";
import { createStagePlot, type StagePlot, fetchFullStagePlotConfig } from "../../api/stagePlots";
import { X, Plus } from 'lucide-react';
import { createPortal } from "react-dom";
import { ErrorMessage } from "../userUI/ErrorMessage";
import { fetchAllProjectByUserId, createNewProject, type Project } from "../../api/projects";
import { useAuth } from "../../contexts/AuthContext";
import { useStageContext } from "../../contexts/StageContext";
import type { PublicStage } from "../../api/stages";

interface PlotCreateFromPublicStageProps {
  onClose: () => void;
  onSuccess: () => void;
  stage: PublicStage;
}

export const PlotCreateFromPublicStage = ({ onClose, onSuccess, stage }: PlotCreateFromPublicStageProps) => {
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gigDateBool, setGigDateBool] = useState(false);
  const [newProjectMode, setNewProjectMode] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [stagePlotForm, setStagePlotForm] = useState<Omit<StagePlot, 'id' | 'createdAt'>>({
    projectId: 0,
    stageId: stage.id,
    name: '',
    gigDate: '',
    stagePlotUUID: crypto.randomUUID(),
  });

  const { user } = useAuth();
  const { setStagePlot, setStage, setElementPlacements, setInputChannels, setActiveProject } = useStageContext();

  useEffect(() => {
    const loadProjects = async () => {
      if (!user) return;
      try {
        const data = await fetchAllProjectByUserId(user.id);
        setProjects(data);
        if (data.length === 0) setNewProjectMode(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      }
    };
    loadProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!stagePlotForm.name) return setError('Plot name is required.');
    if (!newProjectMode && !stagePlotForm.projectId) return setError('Please select a project.');
    if (newProjectMode && !newProjectName.trim()) return setError('Project name is required.');
    try {
      let projectId = stagePlotForm.projectId;

      if (newProjectMode) {
        if (!newProjectName.trim()) {
          setError('Project name is required');
          return;
        }
        const newProject = await createNewProject({
          userId: user.id,
          name: newProjectName.trim(),
          description: newProjectDescription.trim() || undefined,
        });
        projectId = newProject.id;
      }

      const plot = await createStagePlot({ ...stagePlotForm, projectId });
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
          <button aria-label="Close modal" className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && <ErrorMessage error={error} />}

        <form onSubmit={handleSubmit} className="modal-body">
          {!newProjectMode ? (
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
              <button
                type="button"
                aria-label="Create a new project instead"
                className="plot-create-action-link btn-link mt-2"
                onClick={() => setNewProjectMode(true)}
              >
                <Plus size={12} /> New Project
              </button>
            </div>
          ) : (
            <div className="form-group">
              <div className="flex-between mb-2">
                <label className="form-label" htmlFor="new-project-name">New Project Name</label>
                {projects.length > 0 && (
                  <button
                    type="button"
                    aria-label="Select an existing project instead"
                    className="plot-create-action-link btn-link"
                    onClick={() => setNewProjectMode(false)}
                  >
                    Use existing
                  </button>)}
              </div>
              <input
                id="new-project-name"
                className="form-input mb-2"
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={e => setNewProjectName(e.target.value)}
              />
              <input
                id="new-project-description"
                className="form-input"
                type="text"
                placeholder="Description (optional)"
                value={newProjectDescription}
                onChange={e => setNewProjectDescription(e.target.value)}
              />
            </div>
          )}

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
            <div className="checkbox-group">
              <input
                id="bool-gig-date"
                type="checkbox"
                className="checkbox-input"
                checked={gigDateBool}
                onChange={e => setGigDateBool(e.target.checked)}
              />
              <label htmlFor="bool-gig-date" className="checkbox-label">Add Gig Date?</label>
            </div>
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
            <button aria-label="Cancel plot creation" type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button aria-label="Create plot from selected stage" type="submit" className="btn btn-primary">Create Plot</button>
          </div>
        </form>
      </div>
    </>, document.body
  );
};
