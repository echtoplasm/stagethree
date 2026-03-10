import { useState, useEffect } from "react";
import { useStageContext } from "../../contexts/StageContext";
import { fetchAllElementTypes, type ElementType } from "../../api/element";
import { createNewElementPlacement, type ElementPlacement } from "../../api/elementPlacement";
import { createDefaultProjectAndPlot } from "../../api/projects";
import { useAuth } from "../../contexts/AuthContext";
import { addInputChannel, type InputChannel } from "../../api/inputChannel";

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

  const { user, isAuthenticated } = useAuth();

  const fetchElementTypes = async () => {
    const data = await fetchAllElementTypes();
    setElementTypes(data);
    console.log(elementTypes);
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
      const data: ElementPlacement = {
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
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1
      }
      setElementPlacements([...elementPlacements, { ...data, id: Date.now() }])
    } else {
      console.log('stagePlot', stagePlot, 'stage', stage, 'isSandbox', isSandbox)
      if (!user) return null;
      let currentStagePlot = stagePlot;

      if (!stagePlot && !stage) {
        const defaults = await createDefaultProjectAndPlot(user);
        setStage(defaults.stage);
        setStagePlot(defaults.stagePlot);
        setActiveProject(defaults.project);
        refreshProjects();
        currentStagePlot = defaults.stagePlot;
        console.log('currentStagePlot', currentStagePlot);
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
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1
      }

      const newPlacement = await createNewElementPlacement(data);

      
      setElementPlacements([...elementPlacements, { ...newPlacement, name: elt.name, filePathImg: elt.filePathImg }]);
      
      console.log('elementPlacements::::', elementPlacements);


      if (!data.stagePlotId) return null;
      const inputChannel: Omit<InputChannel, 'id' | 'micType' | 'notes' | 'createdAt'> = {
        stagePlotId: data.stagePlotId,
        channelNumber: elementPlacements.length + 1,
        instrumentName: data.name,
      }

      const newInputChannel = await addInputChannel(inputChannel);
      setInputChannels([...inputChannels, { ...newInputChannel }]);
      refreshInputChannels();
      console.log(inputChannels);
    }
  }

  useEffect(() => {
    fetchElementTypes();
    if (!isAuthenticated) setIsSandbox(true);
  }, [isAuthenticated])


  return (
    <div className="element-row">
      {elementTypes.map((elt: any) => (
        <div key={elt.id} className='element-item' onClick={() => handleElementClick(elt)}>{elt.name}</div>
      ))}

    </div>
  )
}
