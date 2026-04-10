import { useState, useEffect } from "react";
import { useStageContext } from "../../contexts/StageContext";
import { fetchAllElementTypes, type ElementType } from "../../api/element";
import { createNewElementPlacement, type ElementPlacement } from "../../api/elementPlacement";
import { createDefaultProjectAndPlot } from "../../api/projects";
import { useAuth } from "../../contexts/AuthContext";
import { addInputChannel, type InputChannel } from "../../api/inputChannel";

/**
 * Element Drawer component that is rendered in the bottom drawer of the plotting page
 * 
 * @returns - JSX for rendering html to page 
 */
export const ElementsDrawer = () => {
  const [elementTypes, setElementTypes] = useState<ElementType[]>([]);
  const {
    isSandbox,
    setIsSandbox,
    stagePlot,
    setStagePlot,
    stage,
    setStage,
    setElementPlacements,
    elementPlacements,
    setActiveProject,
    refreshProjects,
    inputChannels,
    setInputChannels,
    refreshInputChannels
  } = useStageContext();


  /* Authentication provider for global context about auth state */
  const { user, isAuthenticated } = useAuth();

  /** 
   * Async function for fetcing all element types, 
   * passed in useEffect to be fired on component mount
   */
  const fetchElementTypes = async () => {
    const data = await fetchAllElementTypes();
    setElementTypes(data);
  }



  /**
   * an event helper function for element click, that recieves data from context and param
   * formats that data according to the ElementPlacement interface contract setsElementPlacement
   * state and pushes to API
   *
   * @param elt - the element type to be passed to be formatted and setup for db insertion 
   */
  const handleElementClick = async (elt: ElementType) => {

    if (isSandbox) {
      let data: ElementPlacement = {
        elementTypeId: elt.id,
        stagePlotId: stagePlot?.id,
        name: elt.name,
        filePathImg: elt.filePathImg,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: elt.defaultScaleX,
        scaleY: elt.defaultScaleY,
        scaleZ: elt.defaultScaleZ
      }



      setElementPlacements([...elementPlacements, { ...data, id: Date.now() }]);
    } else {
      if (!user) return null;
      let currentStagePlot = stagePlot;

      if (!stagePlot && !stage) {
        const defaults = await createDefaultProjectAndPlot(user);
        setStage(defaults.stage);
        setStagePlot(defaults.stagePlot);
        setActiveProject(defaults.project);
        refreshProjects();
        currentStagePlot = defaults.stagePlot;
      }

      const data: ElementPlacement = {
        elementTypeId: elt.id,
        stagePlotId: currentStagePlot?.id,
        name: elt.name,
        filePathImg: elt.filePathImg,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: elt.defaultScaleX,
        scaleY: elt.defaultScaleY,
        scaleZ: elt.defaultScaleZ
      }

      const newPlacement = await createNewElementPlacement(data);


      setElementPlacements([...elementPlacements, { ...newPlacement, name: elt.name, filePathImg: elt.filePathImg }]);



      if (!data.stagePlotId) return null;
      const inputChannel: Omit<InputChannel, 'id' | 'micType' | 'notes' | 'createdAt'> = {
        stagePlotId: data.stagePlotId,
        channelNumber: elementPlacements.length + 1,
        instrumentName: data.name,
      }

      const newInputChannel = await addInputChannel(inputChannel);
      setInputChannels([...inputChannels, { ...newInputChannel }]);
      refreshInputChannels();
    }
  }

  useEffect(() => {
    fetchElementTypes();
    if (!isAuthenticated) setIsSandbox(true);
  }, [isAuthenticated])

  const categoryLabels: Record<number, string> = {
    1: 'Percussion',
    2: 'Keys',
    3: 'Strings',
    4: 'Microphones',
    5: 'Monitors',
    6: 'Lighting',
    7: 'Other',
  };

  const grouped: Record<string, ElementType[]> = {};
  for (const elt of elementTypes) {
    const category = categoryLabels[elt.elementCategoryId] ?? 'Other';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(elt);
  }
  return (
    <div className="element-drawer">
      {Object.entries(grouped).map(([category, elements]) => (
        <div key={category} className="element-group">
          <p className="element-group-label">{category}</p>
          <div className="element-row">
            {elements.map((elt) => (
              <div key={elt.id} className="element-item" onClick={() => handleElementClick(elt)}>
                {elt.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
