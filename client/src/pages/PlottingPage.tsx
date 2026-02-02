import { useState } from 'react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ArrowRight, ArrowLeft, CircleX} from 'lucide-react'

export function PlottingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div 
          className="overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Projects</h2>
          <button 
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <CircleX />
          </button>
        </div>
        <ProjectCard />
      </aside>
      
      {/* Main content */}
      <main className="content">
        {/* Toggle button */}
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
        
        <div className="panel equipment-panel">
          <h2>Equipment Panel</h2>
        </div>
        
        <div className="panel canvas-panel">
          <h2>2D Canvas</h2>
        </div>
        
        <div className="panel viewer-panel">
          <h2>3D Viewer</h2>
        </div>
      </main>
    </div>
  )
}
