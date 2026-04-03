import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import { type Project } from '../../../api/projects';
import { fetchAllProjectByUserId } from '../../../api/projects';
import { fetchStagePlotsByProjectId, type StagePlotWithStageName } from '../../../api/stagePlots';
import { ProjectUpdate } from './ProjectUpdate';
import { ProjectDeletePortal } from './ProjectDelete';
import { ProjectCreate } from './ProjectCreate';
import { useAuth } from '../../../contexts/AuthContext';
import { PlotUpdate } from '../../../components/plotting/PlotUpdate';
import { PlotDelete } from '../../../components/plotting/PlotDelete'
import { PlotCreate } from '../../../components/plotting/PlotCreate';

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);

  const [deleteProject, setProjectDelete] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectCreate, setProjectCreate] = useState(false);

  /* *** ==== *** PLOT STATE MANAGEMENT ***  ==== *** */

  //plot array/object assignment states
  const [renderPlots, setRenderPlots] = useState(false);
  const [plots, setPlots] = useState<StagePlotWithStageName[] | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<StagePlotWithStageName | null>(null);

  //plot component state
  const [plotUpdate, setPlotUpdate] = useState(false);
  const [plotDelete, setPlotDelete] = useState(false);
  const [plotCreate, setPlotCreate] = useState(false);
  const [plotsLoading, setPlotsLoading] = useState(false);

  /* *** ==== *** AUTH STATE MANAGEMENT *** ==== *** */
  const { user } = useAuth();
  if (!user) return null;


  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProjectByUserId(user.id);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects for user');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);

  const updateProjectState = async () => {
    const data = await fetchAllProjectByUserId(user.id);
    setProjects(data);
  }


  const loadPlots = async (projectId: number) => {
    try {
      if (!selectedProject) return;
      setPlotsLoading(true);
      const data = await fetchStagePlotsByProjectId(projectId);
      setPlots(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plots for user');
    } finally {
      setPlotsLoading(false);
    }
  }

  const updatePlotState = async () => {
    if (!selectedProject) return;
    const data = await fetchStagePlotsByProjectId(selectedProject.id);
    setPlots(data);
  }



  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading projects</p>
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
    <div>
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Manage Your Projects</h1>
          <p className="text-secondary mb-4">Here are all of the projects associated with your account</p>
          <button className="btn btn-primary" onClick={() => setProjectCreate(true)}>
            <Plus size={18} />
            Create New Project
          </button>
        </header>
        {projects.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No project templates found</p>
          </div>
        ) : (
          <div className='card'>
            {projects.map(project => (
              <div key={project.id}>
                <div className='project-row' onClick={() => {
                  setSelectedProject(project);
                  if (selectedProject?.id === project.id) {
                    setRenderPlots(!renderPlots)
                  } else {
                    setSelectedProject(project);
                    loadPlots(project.id);
                    setRenderPlots(true)
                  };
                }}>
                  <span className='icon'><Box size={18} /></span>
                  <div style={{ flex: 1 }}>
                    <span className='name'>{project.name}</span>
                    {project.description && <span className='text-muted' style={{ marginLeft: '0.5rem' }}>— {project.description}</span>}
                  </div>
                  <button className='btn btn-danger btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setProjectDelete(true); }}>
                    <Trash size={16} />
                  </button>
                  <button className='btn btn-update btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setUpdate(true); }}>
                    <Pencil size={16} />
                  </button>
                </div>

                {renderPlots && selectedProject?.id === project.id && plots && (
                  <div style={{ marginLeft: '2.75rem', borderLeft: '1px solid var(--border-accent)', paddingBottom: '0.5rem' }}>
                    {plotsLoading ? (
                      <div className='plot-row'>
                        <div className='spinner' style={{ width: '16px', height: '16px' }} />
                        <span className='text-muted'>Loading plots...</span>
                      </div>
                    ) :
                      plots.map(plot => (
                        <div key={plot.id} className='plot-row'>
                          <span style={{ flex: 1 }}>{plot.name}</span>
                          <span className='text-muted mr-6'>{plot.gigDate}</span>
                          <span className='text-muted'>{plot.stageName}</span>
                          <button className='btn btn-danger btn-sm plot-delete'
                            onClick={() => {
                              setSelectedPlot(plot);
                              setPlotDelete(true);
                            }}>
                            <Trash size={14} />
                          </button>
                          <button className='btn btn-update btn-sm plot-update'
                            onClick={() => {
                              setSelectedPlot(plot);
                              setPlotUpdate(true);
                            }}>
                            <Pencil size={14} />
                          </button>
                        </div>
                      ))
                    }
                    < button className='btn btn-ghost btn-sm' style={{ margin: '0.25rem 0.5rem' }} onClick={() => setPlotCreate(true)}>
                      <Plus size={14} /> Add Plot
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {
        update && selectedProject && (
          <ProjectUpdate
            project={selectedProject}
            onClose={() => { updateProjectState(); setUpdate(false); setSelectedProject(null); }}
          />
        )
      }

      {
        deleteProject && selectedProject && (
          <ProjectDeletePortal
            projectId={selectedProject.id}
            onSuccess={async () => { updateProjectState(); setProjectDelete(false); }}
            onClose={() => { setProjectDelete(false); setSelectedProject(null); }}
          />
        )
      }

      {
        projectCreate && (
          <ProjectCreate
            onSuccess={async () => { updateProjectState(); setProjectCreate(false); }}
            onClose={() => setProjectCreate(false)}
          />
        )
      }

      {
        plotUpdate && selectedPlot && (
          <PlotUpdate
            plot={selectedPlot}
            onClose={() => {
              setSelectedProject(null);
              setSelectedPlot(null);
              setPlotUpdate(false);
            }}

          />
        )
      }

      {
        plotDelete && selectedPlot && (
          <PlotDelete
            plotId={selectedPlot.id}
            onClose={() => {
              setSelectedProject(null);
              setSelectedPlot(null);
              setPlotDelete(false);
            }}
            onSuccess={() => {
              updatePlotState();
              setSelectedProject(null);
              setSelectedPlot(null);
              setPlotDelete(false);
            }}
          />
        )
      }

      {
        plotCreate && selectedProject && (
          <PlotCreate
            projectId={selectedProject.id}
            onSuccess={() => {
              updatePlotState();
              setPlotCreate(false);
            }}
            onClose={() => {
              setPlotCreate(false);
            }}
          />
        )
      }
    </div >
  );
}

