import { useState, useEffect } from 'react';
import { fetchAllProjectByUserId, type Project } from "../../api/projects";
import { fetchFullStagePlotConfig, fetchStagePlotsByProjectId, type StagePlot } from "../../api/stagePlots";
import { Folder, Plus } from 'lucide-react';
import {ProjectCreate} from './ProjectCreate'
import { useAuth } from '../../contexts/AuthContext';


interface ProjectCardProps {
  onPlotSelect: (plotConfig: any) => void;
}


export function ProjectCard({ onPlotSelect }: ProjectCardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [plots, setPlots] = useState<StagePlot[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectCreate, setProjectCreate] = useState(false);

  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) return null;
    const data = await fetchAllProjectByUserId(user.id);
    console.log(data);
    setProjects(data);
  }

  const handleProjectClick = async (projectId: number) => {
    setPlots([]);
    setSelectedProjectId(projectId);
    const stagePlots = await fetchStagePlotsByProjectId(projectId);
    setPlots(stagePlots);
    console.log(stagePlots);
  }

  const handleStagePlotClick = async (plotId: number) => {
    const fullPlotInfo = await fetchFullStagePlotConfig(plotId);
    onPlotSelect(fullPlotInfo);
    console.log(fullPlotInfo);
  }



  useEffect(() => {
    fetchProjects();
  }, [user]);



  return (
    <div className="projects-list">
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
            <p className="stage-count">plots</p>
          </div>
          {selectedProjectId === project.id && (
            <div className="stage-plots-dropdown">
              {plots.map((plot) => (
                <div key={plot.id} onClick={() => handleStagePlotClick(plot.id)}>{plot.name}</div>
              ))}
            </div>
          )}
        </div>
      ))}

      {projectCreate && (
        <ProjectCreate 
          onSuccess={() =>{ fetchProjects(), setProjectCreate(false)}}
          onClose={() => setProjectCreate(false)}/>
      )}
    </div>

  );
}
