import { useState, useEffect } from 'react';
import { fetchAllProjectByUserId, type Project } from "../../api/projects";
import { fetchAllStagePlots, fetchFullStagePlotConfig, fetchStagePlotsByProjectId, type StagePlot, type FullStagePlotResponse } from "../../api/stagePlots";
import { Folder, Plus, PlusCircle, Trash, Pencil } from 'lucide-react';
import { ProjectCreate } from '../shared/projects/ProjectCreate'
import { ProjectDeletePortal } from '../shared/projects/ProjectDelete.tsx';
import { ProjectUpdate } from '../shared/projects/ProjectUpdate.tsx';
import { useAuth } from '../../contexts/AuthContext';
import { PlotCreate } from '../plotting/PlotCreate';
import { PlotDelete } from '../plotting/PlotDelete.tsx'
import { PlotUpdate } from '../plotting/PlotUpdate.tsx'
import { useStageContext } from '../../contexts/StageContext.tsx';

interface ProjectCardProps {
  onStageSelect: () => void;
}


/**
 * Renders the user's projects and stage plots in an accordion layout.
 * Handles project/plot CRUD operations and loads a selected plot into the Three.js scene.
 *
 * @param onStageSelect - Callback invoked when a stage plot is selected, triggering scene navigation.
 * @returns The projects list UI with nested stage plot rows and CRUD modals.
 */

export function ProjectCard({ onStageSelect }: ProjectCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [plots, setPlots] = useState<StagePlot[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectCreate, setProjectCreate] = useState(false);
  const [projectDelete, setProjectDelete] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [createPlot, setCreatePlot] = useState(false);
  const [plotToDelete, setPlotToDelete] = useState<number | null>(null);
  const [plotDelete, setPlotDelete] = useState(false);
  const [projectUpdate, setProjectUpdate] = useState(false);
  const [plotUpdate, setPlotUpdate] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<StagePlot | null>(null);

  const { user } = useAuth();
  const {
    setActiveProject,
    setElementPlacements,
    projectsVersion,
    setInputChannels,
    setStage,
    setStagePlot
  } = useStageContext();


  /**
   * Fetches all projects belonging to the authenticated user and updates local state.
   * Returns early if no authenticated user is present.
   */
  const fetchProjects = async () => {
    if (!user) return null;
    const data = await fetchAllProjectByUserId(user.id);
    setProjects(data);
  }

  /**
   * Handles project row click by fetching and displaying associated stage plots.
   *
   * @param projectId - The ID of the project to expand and load plots for.
   */
  const handleProjectClick = async (projectId: number) => {
    setPlots([]);
    setSelectedProjectId(projectId);
    const stagePlots = await fetchStagePlotsByProjectId(projectId);
    setPlots(stagePlots);
  }





  //============= FUNCTIONS FOR PASSING DATA TO THREEJS SCENE ===============//
  /**
   * Populates StageContext with the full stage plot configuration for scene rendering.
   *
   * @param data - The full stage plot response containing elements, input channels, stage, project, and plot metadata.
   */
  const onPlotSelect = (data: FullStagePlotResponse) => {
    setElementPlacements(data.elements);
    setInputChannels(data.inputChannels);
    setStage(data.stage)
    setActiveProject(data.project);
    setStagePlot(data.stagePlot);

  }

  /**
   * Fetches the full stage plot configuration by ID and loads it into the Three.js scene.
   *
   * @param plotId - The ID of the stage plot to load.
   */
  const handleStagePlotClick = async (plotId: number) => {
    const fullPlotInfo = await fetchFullStagePlotConfig(plotId);
    onPlotSelect(fullPlotInfo);
    onStageSelect();
  }

  /**
   * Opens the plot update modal for the given stage plot.
   *
   * @param plot - The stage plot to be updated.
   */
  const handlePlotUpdateClick = async (plot: StagePlot) => {
    setPlotUpdate(true);
    setSelectedPlot(plot);
  }
  //==================================================================//

  /**===================DELETE HANDLERS===============================//
  
  /**
  * Opens the project delete modal for the given project ID.
  * Returns early if the provided ID is falsy.
  *
  * @param idToDelete - The ID of the project to delete.
  */
  const handleProjectDeleteClick = async (idToDelete: number) => {
    if (!idToDelete) return null;
    setProjectIdToDelete(idToDelete);
    setProjectDelete(true);
  }

  /**
   * Opens the plot delete modal for the given plot ID.
   * Returns early if the provided ID is falsy.
   *
   * @param plotId - The ID of the stage plot to delete.
   */
  const handlePlotDeleteClick = async (plotId: number) => {
    if (!plotId) return null;
    setPlotToDelete(plotId);
    setPlotDelete(true);
  }
  /*=================================================================*/



  /**
   * Refreshes the project list and closes the project update modal.
   */
  const projectStateUpdate = async () => {
    await fetchProjects();
    setProjectUpdate(false);
  }

  /**
   * Fetches projects on mount and whenever the authenticated user or projectsVersion changes.
   * The projectsVersion dependency ensures the list stays in sync after remote mutations.
   */
  useEffect(() => {
    fetchProjects();
  }, [user, projectsVersion]);



  return (
    <div className="projects-list">
      {!user ? (
        <p className='alert'>sign in to save projects</p>
      ) : (
        <>
          <button
            aria-label='Create new project.'
            className="btn btn-primary"
            onClick={() => setProjectCreate(true)}>
            <Plus size={18} />
            Create New Project
          </button>
          {projects.map((project) => (
            <div key={project.id}>
              <div
                className="project-row"
                onClick={() => handleProjectClick(project.id)}
              >
                <span className="icon"><Folder size={18} /></span>
                <span className="name">{project.name}</span>
                <button
                  aria-label='Delete this project.'
                  className="delete btn btn-small btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectDeleteClick(project.id);
                  }}
                >
                  <Trash size={18} />
                </button>
                <button
                  aria-label='Update this project.'
                  className='btn btn-update btn-small'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                    setProjectUpdate(true);
                  }}>

                  <Pencil size={18} />
                </button>
              </div>
              {selectedProjectId === project.id && (
                <div className="stage-plots-dropdown">
                  {plots.map((plot) => (
                    <div key={plot.id} className="plot-row" onClick={() => handleStagePlotClick(plot.id)}>
                      <span className="plot-name">{plot.name}</span>
                      <button
                        aria-label='Delete this stage plot.'
                        className="btn btn-danger btn-sm plot-delete"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlotDeleteClick(plot.id);
                        }}>
                        <Trash size={14} />
                      </button>
                      <button
                        aria-label='Update this stageplot.'
                        className='btn btn-sm btn-update plot-update'
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlotUpdateClick(plot)
                        }}>
                        <Pencil size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    aria-label='Create new stage plot.'
                    className="btn btn-ghost btn-sm create-plot-btn"
                    onClick={() => {
                      setCreatePlot(true);
                      setSelectedProjectId(project.id);
                    }}
                  >
                    <PlusCircle size={14} />
                    Create new plot
                  </button>
                </div>
              )}
            </div>
          ))}
          {projectCreate && (
            <ProjectCreate
              onSuccess={() => { fetchProjects(); setProjectCreate(false); }}
              onClose={() => setProjectCreate(false)}
            />
          )}
          {projectDelete && projectIdToDelete && (
            <ProjectDeletePortal
              projectId={projectIdToDelete}
              onSuccess={() => {
                fetchProjects();
                setProjectDelete(false);
              }}
              onClose={() => setProjectDelete(false)}
            />
          )}

          {createPlot && selectedProjectId !== null && (
            <PlotCreate
              projectId={selectedProjectId}
              onSuccess={() => {
                fetchProjects();
                handleProjectClick(selectedProjectId);
                setCreatePlot(false);
              }}
              onClose={() => setCreatePlot(false)}
            />
          )}

          {plotDelete && (
            <PlotDelete
              plotId={plotToDelete}
              onSuccess={() => {
                fetchAllStagePlots();
                handleProjectClick(selectedProjectId!);
                setPlotDelete(false);
              }}
              onClose={() => {
                setPlotDelete(false);
              }}
            />
          )}

          {projectUpdate && selectedProject && (
            <ProjectUpdate
              project={selectedProject}
              onClose={() => {
                projectStateUpdate();
              }}
            />
          )}

          {plotUpdate && selectedPlot && (
            <PlotUpdate
              plot={selectedPlot}
              onClose={() => { setPlotUpdate(false) }}
              onSuccess={() => {
                setPlotUpdate(false);
                handleProjectClick(selectedProjectId!)
              }}
            />
          )}

        </>
      )}
    </div>
  );
}
