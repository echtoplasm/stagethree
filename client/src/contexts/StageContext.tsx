import { createContext, useContext, useState } from 'react';
import { type Project } from '../api/projects';
import { type InputChannel } from '../api/inputChannel';
import { type Stage } from '../api/stages';
import { type ElementPlacement } from '../api/elementPlacement';
import type { StagePlot } from 'src/api/stagePlots';

interface StageContextType {
  elementPlacements: ElementPlacement[];
  setElementPlacements: (placements: ElementPlacement[]) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  inputChannels: InputChannel[];
  setInputChannels: (inputChannels: InputChannel[]) => void;
  stage: Stage | null;
  setStage: (stage: Stage | null) => void;
  stagePlot: StagePlot | null;
  setStagePlot: (stageplot: StagePlot | null) => void;
  isSandbox: boolean;
  setIsSandbox: (value: boolean) => void;
  projectsVersion: number;
  setProjectsVersion: (value: number) => void;
  refreshProjects: () => void;
  inputChannelsVersion: number;
  setInputChannelsVersion: (value: number) => void;
  refreshInputChannels: () => void;
}

const StageContext = createContext<StageContextType | undefined>(undefined);

/**
 * Provides shared stage plot state to the component tree, acting as the bridge
 * between the user portal, plotting page, and Three.js scene.
 * Manages active project, stage, plot, element placements, and input channels.
 *
 * @param children - The component subtree that will have access to stage context.
 * @returns The StageContext provider wrapping the given children.
 */
export function StageProvider({ children }: { children: React.ReactNode }) {
  const [elementPlacements, setElementPlacements] = useState<ElementPlacement[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [inputChannels, setInputChannels] = useState<InputChannel[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);
  const [stagePlot, setStagePlot] = useState<StagePlot | null>(null);
  const [isSandbox, setIsSandbox] = useState(true);
  const [projectsVersion, setProjectsVersion] = useState(0);
  const [inputChannelsVersion, setInputChannelsVersion] = useState(0);

  /** Increments projectsVersion to trigger dependent project list refetches. */
  const refreshProjects = () => setProjectsVersion(prev => prev + 1);

  /** Increments inputChannelsVersion to trigger dependent input channel list refetches. */
  const refreshInputChannels = () => setInputChannelsVersion(prev => prev + 1);
  return (
    <StageContext.Provider value={{
      elementPlacements,
      setElementPlacements,
      activeProject,
      setActiveProject,
      inputChannels,
      setInputChannels,
      stage,
      setStage,
      stagePlot,
      setStagePlot,
      isSandbox,
      setIsSandbox,
      projectsVersion,
      setProjectsVersion,
      refreshProjects,
      inputChannelsVersion,
      setInputChannelsVersion,
      refreshInputChannels
    }}>
      {children}
    </StageContext.Provider>
  );
}

/**
 * Returns the current stage context.
 * @throws If called outside of a StageProvider.
 */
export const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) throw new Error('useStage must be used within StageProvider');
  return context;
}
