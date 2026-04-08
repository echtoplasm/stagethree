import { createPortal } from 'react-dom';
import { X, Info, Lock } from 'lucide-react';

export interface SandBoxModeProps {
  onClose: () => void;
}

/** 
 * Divider component for rendering a line break within the modal
 *
 */
const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
)

/**
 * Renders a documentation modal component about Sandbox mode
 * 
 * @param  - React props callback function to determine what happens onClose 
 * @returns - A react portal of JSX for rendering modal 
 */
export const SandBoxDocs = ({ onClose }: SandBoxModeProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Sandbox Mode</h2>
          <button aria-label='Exit modal.' className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">

          {/* Overview banner */}
          <div className="alert mb-6">
            <Info size={18} />
            <span>
              Sandbox mode lets you explore StageThree without an account. Some features are restricted
              until you sign in or create an account.
            </span>
          </div>

          {/* Section: Purpose */}
          <section>
            <h3 className="mb-4">Purpose</h3>
            <p className="text-secondary">
              Sandbox mode provides users who are not signed in limited functionality to plot and test
              the application without committing to an account.
            </p>
          </section>

          <Divider />

          {/* Section: Limitations */}
          <section>
            <div className="flex-between mb-4">
              <h3>Limitations</h3>
              <span className="badge">Sandbox</span>
            </div>
            <p className="text-secondary mb-4">
              The following features are unavailable in sandbox mode:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Save your plots',
                'Create projects',
                'Plot on a custom stage',
                'Export your plot to PDF',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="text-secondary">
                  <Lock size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          {/* Section: Sign in */}
          <section>
            <h3 className="mb-4">Exit Sandbox Mode</h3>
            <div className="alert alert-success">
              <Info size={18} />
              <span>
                Upon signing in or creating an account you will be immediately taken out of sandbox
                mode and all features will become available.
              </span>
            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  )
}
