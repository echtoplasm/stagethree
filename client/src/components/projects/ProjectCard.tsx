import { useState, useEffect } from 'react';
import { fetchAllProjects, type Project } from "../../api/projects";
import { Folder } from 'lucide-react';
export function ProjectCard() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const data = await fetchAllProjects();
    console.log(data);
    setProjects(data);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

return (
  <div className="projects-list">
    {projects.map((project) => (
      <div key={project.id} className="project-row">
        <span className="icon"><Folder size={18}/></span>
        <span className="name">{project.name}</span>
        <p className="stage-count">3 plots</p>
      </div>
    ))}
  </div>
);

}
