import { useRef, useState } from 'react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { StageScene } from '../components/ThreeD';
import { ArrowRight, CircleX, Maximize2 } from 'lucide-react';
import { useEffect } from 'react';
import { InputChannelDrawer } from '../components/inputChannels/inputChannelDrawer';
import { InputChannelModal } from '../components/inputChannels/inputChannelsModal';
import { ElementsDrawer } from '../components/elements/elementsDrawer';
import { useAuth } from '../contexts/AuthContext';
import { useStageContext } from '../contexts/StageContext';
import { useWindowSize } from '../hooks/useWindowSize';
import { ScreenSizeModal } from '../components/userUI/ScreenSizeModal';
import { type StageSceneHandle } from '../components/ThreeD';
import { UtilitiesDrawer } from '../components/projectUtilities/UtilitiesDrawer';

/**
 * Main plotting application page composing the Three.js scene, project sidebar,
 * bottom tab drawer, and overlay controls for elements, input channels, and utilities.
 * Renders a screen size warning modal on viewports 768px and below.
 *
 * @returns The full plotting layout with sidebar, scene viewer, tab bar, and drawer.
 */
export function PlottingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [inputChannelModal, setInputChannelModal] = useState(false);
  const { setIsSandbox } = useStageContext();
  const { isAuthenticated } = useAuth();
  const [showStageObjects, setShowStageObjects] = useState(true);
  const [showCurrentStage, setShowCurrentStage] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(true);

  const isSandbox = !isAuthenticated;

  const stageSceneRef = useRef<StageSceneHandle | null>(null);

  const { width } = useWindowSize();

  /** Toggles the active tab, closing it if the same tab is clicked again. */
  const handleTabClick = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  /** Fetches element types on mount and syncs sandbox mode with authentication state. */
  useEffect(() => {

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
          <button aria-label='Close the saved projects sidebar.' className="close-btn" onClick={() => setSidebarOpen(false)}>
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
        <StageScene ref={stageSceneRef}
          showColorPicker={showColorPicker}
          showStageObjects={showStageObjects}
          showCurrentStage={showCurrentStage}
        />
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar">
        <button
          aria-label='Open the utilities tab.'
          className={`tab ${activeTab === 'utilities' ? 'active' : ''}`}
          onClick={() => handleTabClick('utilities')}
        >
          Utilities
        </button>
        <button
          aria-label='Open the elements tab.'
          className={`tab ${activeTab === 'elements' ? 'active' : ''}`}
          onClick={() => handleTabClick('elements')}
        >
          Elements
        </button>
        <button
          aria-label='Open the input channels tab.'
          className={`tab ${activeTab === 'inputs' ? 'active' : ''}`}
          onClick={() => handleTabClick('inputs')}
        >
          Input Channels
        </button>
      </div>

      {/* Bottom Drawer */}
      <div className={`drawer ${activeTab ? 'open' : ''}`}>
        {activeTab === 'utilities' && (
          <div className="drawer-content">
            <h3>Settings</h3>
            <UtilitiesDrawer
              sceneRef={stageSceneRef}
              showCurrentStage={showCurrentStage} setShowCurrentStage={setShowCurrentStage}
              showStageObjects={showStageObjects} setShowStageObjects={setShowStageObjects}
              showColorPicker={showColorPicker} setShowColorPicker={setShowColorPicker}
            />
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
            {!isSandbox && (
              <div>
                <button aria-label='Expand the input channels in order to edit.' className='btn btn-ghost btn-sm mb-4' onClick={() => setInputChannelModal(true)}>
                  <Maximize2 size={14} />
                  <span className='text-secondary'>expand to edit</span>
                </button>
              </div>
            )}
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
