import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import { type Project } from '../../../api/projects';
import { fetchAllProjectByUserId } from '../../../api/projects';
import { fetchStagePlotsByProjectId, fetchFullStagePlotConfig, type StagePlotWithStageName, type FullStagePlotResponse } from '../../../api/stagePlots';
import { ProjectUpdate } from './ProjectUpdate';
import { ProjectDeletePortal } from './ProjectDelete';
import { ProjectCreate } from './ProjectCreate';
import { useAuth } from '../../../contexts/AuthContext';
import { PlotUpdate } from '../../../components/plotting/PlotUpdate';
import { PlotDelete } from '../../../components/plotting/PlotDelete'
import { PlotCreate } from '../../../components/plotting/PlotCreate';
import { useStageContext } from '../../../contexts/StageContext';
import { useNavigate } from 'react-router-dom';


/**
 * Displays all projects belonging to the authenticated user with expandable stage plot rows.
 * Handles project/plot CRUD operations and navigates to the plotting page with full scene context.
 * Returns null if no authenticated user is present.
 *
 * @returns The project table UI with nested plot rows and CRUD modals.
 */
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

  /* *** === *** STAGE CONTEXT PROVIDER *** === *** */
  /* this is for passing context about the plot to the provider in
     in order to redirect from the user portal to the /app and provide
     the clicked plots details and populate the three scene */

  const {
    setActiveProject,
    setElementPlacements,
    setInputChannels,
    setStage,
    setStagePlot
  } = useStageContext();


  /* *** === *** AUTH STATE MANAGEMENT *** === *** */
  const { user } = useAuth();
  if (!user) return null;


  //used to update the project state after any CRUD action
  const updateProjectState = async () => {
    const data = await fetchAllProjectByUserId(user.id);
    setProjects(data);
  }


  const navigate = useNavigate();

  /**
   * Fetches stage plots for the given project and updates plot state.
   * Returns early if no project is currently selected.
   *
   * @param projectId - The ID of the project to load plots for.
   */
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

  /** Refreshes the plot list for the currently selected project after any CRUD operation. */
  const updatePlotState = async () => {
    if (!selectedProject) return;
    const data = await fetchStagePlotsByProjectId(selectedProject.id);
    setPlots(data);
  }

  /**
   * Fetches the full stage plot configuration by ID.
   *
   * @param plotId - The ID of the stage plot to fetch.
   * @returns The full plot configuration, or undefined if the ID is falsy.
   */
  const getFullPlotConfig = async (plotId: number) => {
    if (!plotId) return;
    const data = await fetchFullStagePlotConfig(plotId);
    return data;
  }

  /**
   * Populates StageContext with full plot configuration data for scene rendering.
   *
   * @param data - The full stage plot response containing elements, input channels, stage, project, and plot metadata.
   */
  const setPlotContext = (data: FullStagePlotResponse) => {
    setElementPlacements(data.elements);
    setInputChannels(data.inputChannels);
    setStage(data.stage)
    setActiveProject(data.project);
    setStagePlot(data.stagePlot);
  }

  //navigates to app page
  const handleAppPageNavigate = () => {
    navigate('/app');
  }

  /**
   * Fetches full plot config, loads it into StageContext, and navigates to the plotting page.
   *
   * @param plotId - The ID of the stage plot to open in the app.
   */
  const handleGoToAppClick = async (plotId: number) => {
    if (!plotId) return;
    const data = await getFullPlotConfig(plotId);
    if (!data) return;
    setPlotContext(data);
    handleAppPageNavigate();
  }



  /**
   * Fetches all projects for the authenticated user on mount.
   * Sets loading and error state accordingly.
   */
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
          <button aria-label="Create new project." className="btn btn-primary" onClick={() => setProjectCreate(true)}>
            <Plus size={18} />
            Create New Project
          </button>
        </header>
        {projects.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No project templates found</p>
          </div>
        ) : /* currently the onclick here is not working properly*/ (
          <div className='card'>

            {projects.map(project => (
              <div key={project.id}>
                <div className='project-row' onClick={() => {
                  const isSelected = selectedProject?.id === project.id && renderPlots;
                  if (isSelected) {
                    setRenderPlots(false);
                  } else {
                    setSelectedProject(project);
                    loadPlots(project.id);
                    setRenderPlots(true);
                  }
                }}>
                  <span className='icon'><Box size={18} /></span>
                  <div style={{ flex: 1 }}>
                    <span className='name'>{project.name}</span>
                    {project.description && <span className='text-muted' style={{ marginLeft: '0.5rem' }}>— {project.description}</span>}
                  </div>
                  <button aria-label="Delete project." className='btn btn-danger btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setProjectDelete(true); }}>
                    <Trash size={16} />
                  </button>
                  <button aria-label="Update project." className='btn btn-update btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedProject(project); setUpdate(true); }}>
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
                          <button aria-label="Delete stage plot." className='btn btn-danger btn-sm plot-delete'
                            onClick={() => {
                              setSelectedPlot(plot);
                              setPlotDelete(true);
                            }}>
                            <Trash size={14} />
                          </button>
                          <button aria-label="Update stage plot." className='btn btn-update btn-sm plot-update'
                            onClick={() => {
                              setSelectedPlot(plot);
                              setPlotUpdate(true);
                            }}>
                            <Pencil size={14} />
                          </button>
                          <button aria-label="Go to plotting application with plot data." className='btn btn-sm btn-update plot-to-app' onClick={() => {
                            setSelectedPlot(plot)
                            selectedPlot && handleGoToAppClick(selectedPlot.id)
                          }}>
                            To App
                          </button>
                        </div>
                      ))
                    }
                    <button aria-label="Create new plot." className='btn btn-ghost btn-sm' style={{ margin: '0.25rem 0.5rem' }} onClick={() => setPlotCreate(true)}>
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

