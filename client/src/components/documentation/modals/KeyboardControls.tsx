
import { createPortal } from "react-dom"
import { Keyboard, X } from "lucide-react"

interface ControlsDocModalProps {
  onClose: () => void;
}

const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
)

const KeyBadge = ({ label }: { label: string }) => (
  <kbd style={{
    display: 'inline-block',
    padding: '2px 8px',
    fontSize: '0.8125rem',
    fontFamily: 'monospace',
    border: '1px solid var(--border-strong)',
    borderRadius: '4px',
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
    marginRight: '4px',
  }}>{label}</kbd>
)

export const ControlsDocModal = ({ onClose }: ControlsDocModalProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Controls</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">

          {/* Section: Camera */}
          <section>
            <div className="flex-between mb-4">
              <h3>Camera controls</h3>
              <Keyboard size={18} />
            </div>
            <p className="text-secondary mb-4">
              The 3D canvas supports both mouse and keyboard camera controls. Use the mouse to orbit
              and zoom, or use keyboard shortcuts for precise navigation.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div className="flex-between">
                <span className="text-secondary">Move forward / backward</span>
                <div><KeyBadge label="W" /> <KeyBadge label="S" /></div>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Move left / right</span>
                <div><KeyBadge label="A" /> <KeyBadge label="D" /></div>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Move up / down</span>
                <div><KeyBadge label="Q" /> <KeyBadge label="E" /></div>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Orbit camera</span>
                <span className="text-secondary">Left click + drag</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Zoom</span>
                <span className="text-secondary">Scroll wheel</span>
              </div>
            </div>
          </section>

          <Divider />

          {/* Section: Element controls */}
          <section>
            <h3 className="mb-4">Element controls</h3>
            <p className="text-secondary mb-4">
              Click any element in the scene to select it. Once selected, you can reposition it by
              dragging or use keyboard shortcuts for fine-grain rotation control. Ensure that you are holding the left click button on the element while click the rotate buttons in order to actually rotate the element.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div className="flex-between">
                <span className="text-secondary">Select element</span>
                <span className="text-secondary">Left click</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Drag to reposition</span>
                <span className="text-secondary">Left click + drag</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Rotate element</span>
                <div><KeyBadge label="←" /> <KeyBadge label="→" /></div>
              </div>
            </div>
          </section>

          <Divider />

          {/* Section: Context menu */}
          <section>
            <h3 className="mb-4">Context menu</h3>
            <p className="text-secondary mb-2">
              Right-clicking any element in the scene opens the context menu, which provides access to
              fine-grain controls for that element.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div className="flex-between">
                <span className="text-secondary">Open context menu</span>
                <span className="text-secondary">Right click element</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Update position (X, Y, Z)</span>
                <span className="text-secondary">Right click → Update Position</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Update rotation (X, Y, Z)</span>
                <span className="text-secondary">Right click → Update Rotation</span>
              </div>
              <div className="flex-between">
                <span className="text-secondary">Delete element</span>
                <span className="text-secondary">Right click → Delete</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  )
}
