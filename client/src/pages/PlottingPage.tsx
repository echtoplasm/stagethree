import { useState } from 'react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { StageScene } from '../components/ThreeD';
import { ArrowRight, CircleX } from 'lucide-react';
import { fetchAllElementTypes, type ElementType } from '../api/element';
import { useEffect } from 'react';

export function PlottingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);

  


  const fetchElementTypes = async () => {
    const data = await fetchAllElementTypes();
    setElementTypes(data);
    console.log(elementTypes);
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  useEffect(() => {
    fetchElementTypes();
  }, []);
  return (
    <div className="plotting-layout">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Left Sidebar - Projects */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Projects</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <CircleX />
          </button>
        </div>
        <ProjectCard />
      </aside>

      {/* Sidebar Toggle */}
      <button
        className={`sidebar-toggle ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle saved projects"
      >
        <ArrowRight className="toggle-arrow" />
        <span className="toggle-label">Saved Projects</span>
      </button>

      {/* Main 3D Viewer */}
      <div className="viewer-container">
        <StageScene />
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => handleTabClick('equipment')}
        >
          Equipment
        </button>
        <button
          className={`tab ${activeTab === 'elements' ? 'active' : ''}`}
          onClick={() => handleTabClick('elements')}
        >
          Elements
        </button>
        <button
          className={`tab ${activeTab === 'inputs' ? 'active' : ''}`}
          onClick={() => handleTabClick('inputs')}
        >
          Input Channels
        </button>
      </div>

      {/* Bottom Drawer */}
      <div className={`drawer ${activeTab ? 'open' : ''}`}>
        {activeTab === 'equipment' && (
          <div className="drawer-content">
            <h3>Equipment</h3>
            <p>Equipment palette will go here</p>
          </div>
        )}
        {activeTab === 'elements' && (
          <div className="drawer-content">
            <h3>Stage Elements</h3>
            <div className="element-row">
              {elementTypes.map((elt: any) => (
                <div key={elt.id} className='element-item'>{elt.name}</div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'inputs' && (
          <div className="drawer-content">
            <h3>Input Channels</h3>

          </div>
        )}
      </div>
    </div>
  );
}
