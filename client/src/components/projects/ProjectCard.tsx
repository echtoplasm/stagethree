import { useState, useEffect } from 'react';
import { fetchAllProjects, type Project } from "../../api/projects";
import { fetchStagePlotsByProjectId, type StagePlot } from "../../api/stagePlots";
import { Folder } from 'lucide-react';


export function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [plots, setPlots] = useState<StagePlot[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const fetchProjects = async () => {
    const data = await fetchAllProjects();
    console.log(data);
    setProjects(data);
  }

  const handleProjectClick = async (projectId: number) => {
    setSelectedProjectId(projectId);
    const stagePlots = await fetchStagePlotsByProjectId(projectId);
    setPlots(stagePlots);
    console.log(stagePlots);
  }



  useEffect(() => {
    fetchProjects();
  }, []);



return (
  <div className="projects-list">
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
              <div key={plot.id}>{plot.name}</div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);
}
