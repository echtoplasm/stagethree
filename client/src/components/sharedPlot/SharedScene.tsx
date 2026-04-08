import { StageScene } from "../ThreeD";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStageContext } from "../../contexts/StageContext"
import { fetchFullStagePlotByUUID } from "../../api/stagePlots"

export function ShareView() {
  const { uuid } = useParams();
  const { setElementPlacements, setInputChannels, setStage, setStagePlot, setActiveProject } = useStageContext();

  useEffect(() => {
    const fetchPlot = async () => {
      const data = await fetchFullStagePlotByUUID(uuid!);
      setElementPlacements(data.elements);
      setInputChannels(data.inputChannels);
      setStage(data.stage);
      setStagePlot(data.stagePlot);
      setActiveProject(data.project);
    };
    fetchPlot();
  }, [uuid]);

  return (
    <div className="plotting-layout">
      <div className="viewer-container">
        <StageScene
          showStageObjects={false}
          showColorPicker={false}
          showCurrentStage={false} />
      </div>
    </div>
  );
}
