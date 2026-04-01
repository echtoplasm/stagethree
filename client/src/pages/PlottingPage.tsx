import { useRef, useState } from 'react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { StageScene } from '../components/ThreeD';
import { ArrowRight, CircleX, Maximize2 } from 'lucide-react';
import { fetchAllElementTypes, type ElementType } from '../api/element';
import { useEffect } from 'react';
import { InputChannelDrawer } from '../components/inputChannels/inputChannelDrawer';
import { InputChannelModal } from '../components/inputChannels/inputChannelsModal';
import { ElementsDrawer } from '../components/elements/elementsDrawer';
import { useAuth } from '../contexts/AuthContext';
import { useStageContext } from '../contexts/StageContext';
import { useWindowSize } from '../hooks/useWindowSize';
import { ScreenSizeModal } from '../components/userUI/ScreenSizeModal';
import { type StageSceneHandle } from '../components/ThreeD';
import { SettingsDrawer } from '../components/projectSettings/SettingsDrawer';

export function PlottingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);
  const [inputChannelModal, setInputChannelModal] = useState(false);
  const { setIsSandbox } = useStageContext();
  const { isAuthenticated } = useAuth();


  const stageSceneRef = useRef<StageSceneHandle | null>(null);

  const { width } = useWindowSize();

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
    if (isAuthenticated) setIsSandbox(false);
  }, [isAuthenticated]);


  return (
    <div className="plotting-layout">
      {width <= 768 && <ScreenSizeModal />}
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
        <ProjectCard onStageSelect={() => setSidebarOpen(false)} />
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
        <StageScene ref={stageSceneRef} />
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar">
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Settings
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
        {activeTab === 'settings' && (
          <div className="drawer-content">
            <h3>Settings</h3>
            <SettingsDrawer sceneRef={stageSceneRef}/>
          </div>
        )}
        {activeTab === 'elements' && (
          <div className="drawer-content">
            <h3>Stage Elements</h3>
            <div className="element-row">
              <ElementsDrawer />
            </div>
          </div>
        )}
        {activeTab === 'inputs' && (
          <div className="drawer-content pb-8">
            <button className='btn-sm btn-ghost mb-4' onClick={() => setInputChannelModal(true)}>
              <Maximize2 />
            </button>
            <span className='text-secondary'> expand to edit</span>
            <h3>Input Channels</h3>
            <InputChannelDrawer />
          </div>
        )}

        {inputChannelModal && (
          <InputChannelModal onClose={() => setInputChannelModal(false)} />
        )}


      </div>
    </div>
  );
}
