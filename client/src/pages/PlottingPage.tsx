import { ProjectCard } from "../components/projects/ProjectCard";
export function PlottingPage() {
  // const [selectedProject, setSelectedProject] = useState(null);
  // const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <ProjectCard />
      <p className="card">This is where the equipment panel will go</p>
      <p className="card">This is where the 2D canvas will go</p>
      <p className="card">This is where the 3D viewing option will go</p>
    </div>
  )
}
