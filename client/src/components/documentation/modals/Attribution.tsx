import { createPortal } from "react-dom"
import { Info, X } from "lucide-react"
import { Divider } from "../utilityComponents/Divider";

interface AttributionModalProps {
  onClose: () => void;
}

/**
 * Modal Component for rendering 3D model attribution
 *
 * @param onClose - Callback invoked when the modal is dismissed.
 * @returns - JSX within a React Portal for rendering HTML modal
 */
export const AttributionModal = ({ onClose }: AttributionModalProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Model Attribution</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">

          <div className="alert alert-success">
            <Info size={18} />
            <span>
              StageThree uses third-party 3D models from Poly Pizza and Sketchfab. Attribution is
              provided below in accordance with each model's license.
            </span>
          </div>

          <section>
            <h3 className="mb-4">Poly Pizza</h3>
            <div className="attribution-list">

              <div className="attribution-item">
                <span className="attribution-name">Drum Set</span>
                <div className="attribution-meta">
                  <span>Zsky</span>
                  <span className="badge badge-success">CC BY 3.0</span>
                  <a href="https://poly.pizza/m/qWU9Q4flfQ" target="_blank" rel="noreferrer">poly.pizza/m/qWU9Q4flfQ</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Speaker</span>
                <div className="attribution-meta">
                  <span>iPoly3D</span>
                  <a href="https://poly.pizza/m/zOQOThSpuo" target="_blank" rel="noreferrer">poly.pizza/m/zOQOThSpuo</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">ASW Lights w/ Speaker</span>
                <div className="attribution-meta">
                  <span>TRASH - TANUKI</span>
                  <span className="badge badge-success">CC BY 3.0</span>
                  <a href="https://poly.pizza/m/1JR6N1uyJlq" target="_blank" rel="noreferrer">poly.pizza/m/1JR6N1uyJlq</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Mic</span>
                <div className="attribution-meta">
                  <span>iPoly3D</span>
                  <a href="https://poly.pizza/m/yqbacXdPsg" target="_blank" rel="noreferrer">poly.pizza/m/yqbacXdPsg</a>
                </div>
              </div>

            </div>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Sketchfab</h3>
            <div className="attribution-list">

              <div className="attribution-item">
                <span className="attribution-name">Electric Guitar</span>
                <div className="attribution-meta">
                  <span>Kangarooz 3D</span>
                  <span className="badge badge-warning">CC Non-Commercial</span>
                  <a href="https://sketchfab.com/KangaroOz-3D" target="_blank" rel="noreferrer">sketchfab.com/KangaroOz-3D</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Monitor Wedge</span>
                <div className="attribution-meta">
                  <span>oldessexboy</span>
                  <span className="badge badge-success">CC BY</span>
                  <a href="https://sketchfab.com/Oldessexboy" target="_blank" rel="noreferrer">sketchfab.com/Oldessexboy</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Lighting Rig</span>
                <div className="attribution-meta">
                  <span>eventdesignws</span>
                  <a href="https://sketchfab.com/eventdesignws" target="_blank" rel="noreferrer">sketchfab.com/eventdesignws</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Drums on Riser</span>
                <div className="attribution-meta">
                  <span>eventdesignws</span>
                  <a href="https://sketchfab.com/eventdesignws" target="_blank" rel="noreferrer">sketchfab.com/eventdesignws</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Bass Guitar</span>
                <div className="attribution-meta">
                  <span>serefatilla</span>
                  <a href="https://sketchfab.com/3d-models/custom-made-bass-guitar-54b2e94353d843eb8daba50b62edd78f" target="_blank" rel="noreferrer">sketchfab.com/serfatilla</a>
                </div>
              </div>

              <div className="attribution-item">
                <span className="attribution-name">Acoustic Guitar</span>
                <div className="attribution-meta">
                  <span>afurokn</span>
                  <a href="https://sketchfab.com/3d-models/acoustic-guitar-b52fcec4b641493f8939c50c253c4ac3" target="_blank" rel="noreferrer">sketchfab.com/afurokn</a>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  )
}
