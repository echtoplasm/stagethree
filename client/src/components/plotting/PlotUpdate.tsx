import { useState } from 'react';
import { X } from 'lucide-react';
import { type StagePlot, updatePlot } from '../../api/stagePlots';
import { createPortal } from 'react-dom';
import { ErrorMessage } from '../userUI/ErrorMessage';

interface PlotUpdateProps {
  plot: StagePlot;
  onClose: () => void;
}


export function PlotUpdate({ plot, onClose }: PlotUpdateProps) {
  //state management
  const [plotForm, setPlotForm] = useState<StagePlot>({
    id: plot.id,
    name: plot.name,
    projectId: plot.projectId,
    createdAt: plot.createdAt,
    gigDate: plot.gigDate,
    stagePlotUUID: plot.stagePlotUUID
  });

  const [error, setError] = useState<string | null>(null);

  //submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await updatePlot(plotForm.id, plotForm);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Missing One or 2 fields for form submission')
    }
  }


  return createPortal(
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
            <h2>Update Plot</h2>
            <p className="text-secondary">Edit the plot dimensions and name</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {error && (
          <ErrorMessage error={error} />
        )}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* plot NAME */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Plot Name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={plotForm.name}
              onChange={(e) => setPlotForm({ ...plotForm, name: e.target.value })}
            />
          </div>
          {/* plot DESCRIPTION */}
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
    </>, document.body
  );
}
