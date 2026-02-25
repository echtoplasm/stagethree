import { useState, useEffect } from 'react';
import { fetchAllProjectByUserId, type Project } from "../../api/projects";
import { fetchAllStagePlots, fetchFullStagePlotConfig, fetchStagePlotsByProjectId, type StagePlot } from "../../api/stagePlots";
import { Folder, Plus, PlusCircle, Trash } from 'lucide-react';
import { ProjectCreate } from './ProjectCreate'
import { ProjectDelete } from './ProjectDelete';
import { useAuth } from '../../contexts/AuthContext';
import { PlotCreate } from '../plotting/PlotCreate';
import { PlotDelete } from '../plotting/PlotDelete.tsx'
import { useStageContext } from '../../contexts/StageContext.tsx';
import { type FullStagePlotResponse } from '../../api/stagePlots';


export function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [plots, setPlots] = useState<StagePlot[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectCreate, setProjectCreate] = useState(false);
  const [projectDelete, setProjectDelete] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<number | null>(null);
  const [createPlot, setCreatePlot] = useState(false);
  const [plotToDelete, setPlotToDelete] = useState<number | null>(null);
  const [plotDelete, setPlotDelete] = useState(false);

  const { user } = useAuth();
  const { setActiveProject, setElementPlacements, setInputChannels, setStage, setStagePlot } = useStageContext();


  /** 
   * Fetch projects by userid using client/api/ project file with a !user auth guard
   * calls setProjects state to render all user created projects
   * */
  const fetchProjects = async () => {
    if (!user) return null;
    const data = await fetchAllProjectByUserId(user.id);
    console.log(data);
    setProjects(data);
  }

  /**
   * click handler to set state of plots and selected projectId 
   *
   *
   * @param projectId - projectId to updated selectedprojectId state
   */
  const handleProjectClick = async (projectId: number) => {
    setPlots([]);
    setSelectedProjectId(projectId);
    const stagePlots = await fetchStagePlotsByProjectId(projectId);
    setPlots(stagePlots);
    console.log(stagePlots);
  }


  //============= FUNCTIONS FOR PASSING DATA TO THREEJS SCENE ===============//
  /**
   * helper function for handleStagePlotClick that sets stage context provider
   * that will then be accessible to the three.js scene
   *
   * @param data - stagePlotResponse from apiFetch stageplot:full
   */
  const onPlotSelect = (data: FullStagePlotResponse) => {
    setElementPlacements(data.elements);
    setInputChannels(data.inputChannels);
    setStage(data.stage)
    setActiveProject(data.project);
    setStagePlot(data.stagePlot);
  }

  /**
   * @param plotId - click handler for fetching full stageplot config 
   * from API
   */
  const handleStagePlotClick = async (plotId: number) => {
    const fullPlotInfo = await fetchFullStagePlotConfig(plotId);
    onPlotSelect(fullPlotInfo);
    console.log(fullPlotInfo);
  }
  //==================================================================//

  /**===================DELETE HANDLERS===============================//
   * These delete project/plot by id
   * 
   * sets the state of project/plot to delete to be passed to the 
   * Delete modals
   *
   * both contain early returns if param are falsy
   *
   */
  const handleProjectDeleteClick = async (idToDelete: number) => {
    if (!idToDelete) return null;
    setProjectIdToDelete(idToDelete);
    setProjectDelete(true);
  }

  const handlePlotDeleteClick = async (plotId: number) => {
    if (!plotId) return null;
    setPlotToDelete(plotId);
    setPlotDelete(true);
  }
  /*=================================================================*/



  /** 
   * Use effect to fetch projects on page load
   * dependency array: user - ensures no projects are rendered
   * if user is not truthy
   * */
  useEffect(() => {
    fetchProjects();
  }, [user]);



  return (
    <div className="projects-list">
      {!user ? (
        <span>sign in to save projects</span>
      ) : (
        <>
          <button className="btn btn-primary" onClick={() => setProjectCreate(true)}>
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
                  className="delete btn btn-small btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectDeleteClick(project.id);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
              {selectedProjectId === project.id && (
                <div className="stage-plots-dropdown">
                  {plots.map((plot) => (
                    <div key={plot.id} onClick={() => handleStagePlotClick(plot.id)}>
                      {plot.name}
                      <button onClick={(e) => {
                        e.stopPropagation()
                        handlePlotDeleteClick(plot.id);
                      }}>
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn-small"
                    onClick={() => {
                      setCreatePlot(true);
                      setSelectedProjectId(project.id);
                    }}
                  >
                    <span><PlusCircle size={18} /> Create new plot</span>
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
          {projectDelete && (
            <ProjectDelete
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
        </>
      )}
    </div>
  );
}
