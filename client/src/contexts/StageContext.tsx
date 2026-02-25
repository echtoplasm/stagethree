import { createContext, useContext, useState} from 'react';
import { type Project } from '../api/projects';
import { type InputChannel } from '../api/inputChannel';
import { type Stage } from '../api/stages';
import {type ElementPlacement} from '../api/elementPlacement';
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
}

const StageContext = createContext<StageContextType | undefined>(undefined);


export function StageProvider({ children }: { children: React.ReactNode }) {
  const [elementPlacements, setElementPlacements] = useState<ElementPlacement[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [inputChannels, setInputChannels] = useState<InputChannel[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);
  const [stagePlot, setStagePlot] = useState<StagePlot | null>(null);

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
      setStagePlot
    }}>
      {children}
    </StageContext.Provider>
  );
}

export const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) throw new Error('useStage must be used within StageProvider');
  return context;
}
