import { createContext, useContext, useState} from 'react';
import { type Project } from '../api/projects';
import { type InputChannel } from '../api/inputChannel';
import { type Stage } from '../api/stages';
import {type ElementPlacement} from '../api/elementPlacement';

interface StageContextType {
  elementPlacements: ElementPlacement[];
  setElementPlacements: (placements: ElementPlacement[]) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  inputChannels: InputChannel[];
  setInputChannels: (inputChannels: InputChannel[]) => void;
  stage: Stage | null;
  setStage: (stage: Stage | null) => void;
}

const StageContext = createContext<StageContextType | undefined>(undefined);


export function StageProvider({ children }: { children: React.ReactNode }) {
  const [elementPlacements, setElementPlacements] = useState<ElementPlacement[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [inputChannels, setInputChannels] = useState<InputChannel[]>([]);
  const [stage, setStage] = useState<Stage | null>(null);


  return (
    <StageContext.Provider value={{
      elementPlacements,
      setElementPlacements,
      activeProject,
      setActiveProject,
      inputChannels,
      setInputChannels,
      stage,
      setStage
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
