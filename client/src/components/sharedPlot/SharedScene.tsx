import { StageScene } from "../ThreeD";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStageContext } from "../../contexts/StageContext"
import { fetchFullStagePlotByUUID } from "../../api/stagePlots"


/**
 * Read-only stage plot viewer for public share links.
 * Fetches full plot configuration by UUID from the route params and loads it into StageContext.
 *
 * @returns The Three.js scene in viewer mode with all overlays disabled.
 */
export function ShareView() {
  const { uuid } = useParams();
  const { setElementPlacements, setInputChannels, setStage, setStagePlot, setActiveProject } = useStageContext();
  /**
   * Fetches the full plot configuration by UUID and populates StageContext for scene rendering.
   * Refetches whenever the UUID route param changes.
   */
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
