import { createPortal } from 'react-dom';
import { X, Info, Link, Users } from 'lucide-react';

export interface SharePlotDocsProps {
  onClose: () => void;
}

/**
 * Divider component for rendering a line break within the modal
 */
const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
);

/**
 * Renders a documentation modal component about plot sharing
 *
 * @param onClose - React props callback function to determine what happens onClose
 * @returns A react portal of JSX for rendering modal
 */
export const SharePlotDocs = ({ onClose }: SharePlotDocsProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Sharing Your Plot</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="alert mb-6">
            <Info size={18} />
            <span>
              Share any plot with a unique link. Recipients can explore your 3D scene
              without an account — and without affecting your original plot.
            </span>
          </div>

          <section>
            <h3 className="mb-4">How to Share</h3>
            <p className="text-secondary mb-4">
              Navigate to the app page and open the Utilities drawer at the bottom of the screen.
              Click the <strong>Share Plot</strong> button — this will copy a unique link to your
              clipboard. From there you can share it however you prefer: email, Slack, text, or
              anywhere else.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">What the Recipient Gets</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: <Link size={14} />, text: 'A direct link to a live 3D view of your stage plot' },
                { icon: <Users size={14} />, text: 'The ability to move and explore elements in the scene' },
                { icon: <Info size={14} />, text: 'No account required to view or interact with the shared plot' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="text-secondary">
                  {item.icon}
                  {item.text}
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Your Plot Is Safe</h3>
            <div className="alert alert-success">
              <Info size={18} />
              <span>
                Any changes a recipient makes in the shared view are not saved and will never
                affect your original plot. The shared link is always a read-only snapshot of
                your work.
              </span>
            </div>
          </section>
        </div>
      </div>
    </>,
    document.body
  );
};
