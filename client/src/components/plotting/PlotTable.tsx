import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import { type StagePlot, type StagePlotWithStageName } from '../../api/stagePlots';
import { fetchStagePlotsByProjectId } from '../../api/stagePlots';
import { PlotCreate } from './PlotCreate';
import { PlotDelete } from './PlotDelete';
import { PlotUpdate } from './PlotUpdate';
import { type Project } from '../../api/projects';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react'

interface PlotTableProps {
  selectedProject: Project;
  onClose: () => void;
}


export function PlotTable({ selectedProject, onClose }: PlotTableProps) {
  const [plots, setPlots] = useState<StagePlotWithStageName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [deletePlot, setPlotDelete] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<StagePlot | null>(null)
  const [plotCreate, setPlotCreate] = useState(false);

  const { user } = useAuth();
  if (!user) return null;


  useEffect(() => {
    const loadPlots = async () => {
      try {
        setLoading(true);
        const data = await fetchStagePlotsByProjectId(selectedProject.id);
        setPlots(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plots for user');
      } finally {
        setLoading(false);
      }
    };

    loadPlots();
  }, [selectedProject.id]);

  const updatePlotState = async () => {
    const data = await fetchStagePlotsByProjectId(selectedProject.id);
    setPlots(data);
  }


  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading plots</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex-center">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-8 card'>
      <div className="content-wrapper">
        <header className="mb-6">
          <button className="btn btn-ghost btn-sm mb-4" onClick={onClose}>
            <X size={18} />
          </button>
          <h1>Manage {selectedProject.name} Plots</h1>

          <p className="text-secondary mb-4">
            Here are all of the plots associated with the {selectedProject ? selectedProject.name : undefined} project
          </p>
          <button className="btn btn-primary" onClick={() => setPlotCreate(true)}>
            <Plus size={18} />
            Create New Plot
          </button>
        </header>
        {plots.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No plot templates found</p>
          </div>
        ) : (
          <div className='card'>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Project ID</th>
                  <th>Stage Name</th>
                  <th>Created At</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plots.map(plot => (
                  <tr key={plot.id}>
                    <td>{plot.name}</td>
                    <td>{plot.stageId}</td>
                    <td>{plot.projectId}</td>
                    <td>{plot.stageName}</td>
                    <td>{plot.createdAt}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"

                        onClick={() => {
                          setSelectedPlot(plot)
                          setPlotDelete(true)
                        }}
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-sm'
                        onClick={() => {
                          setSelectedPlot(plot)
                          console.log(selectedPlot);
                          setUpdate(true)
                        }}
                      >
                        <Pencil size={16} />
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {update && selectedPlot && (

        <PlotUpdate
          plot={selectedPlot}
          onClose={() => {
            updatePlotState();
            setUpdate(false);
            setSelectedPlot(null);
          }}
        />
      )}


      {deletePlot && selectedPlot && (
        <PlotDelete
          plotId={selectedPlot.id}
          onSuccess={async () => {
            updatePlotState();
            setPlotDelete(false);
          }}
          onClose={() => {
            setPlotDelete(false);
            setSelectedPlot(null);
          }}

        />
      )}

      {plotCreate && (
        <PlotCreate
          projectId={selectedProject.id}
          onSuccess={async () => {
            updatePlotState();
            setPlotCreate(false);
          }}
          onClose={() => setPlotCreate(false)}
        />
      )}
    </div >
  );
}
