import { useState, useEffect } from 'react';
import { fetchAllProjects } from "../../api/projects";

export function ProjectCard() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const data = await fetchAllProjects();
    console.log(data);
    setProjects(data);
  }
  
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) =>(
          <li key={project.id_prj}>{project.name_prj}</li>
        ))}
      </ul>
    </div>
  )

}
