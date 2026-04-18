import { createPortal } from 'react-dom';
import { X, Info, FileDown, Camera } from 'lucide-react';

export interface PdfExportDocsProps {
  onClose: () => void;
}

/**
 * Divider component for rendering a line break within the modal
 */
const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
);

/**
 * Renders a documentation modal component about PDF export
 *
 * @param onClose - React props callback function to determine what happens onClose
 * @returns A react portal of JSX for rendering modal
 */
export const PdfExportDocs = ({ onClose }: PdfExportDocsProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Exporting to PDF</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="alert mb-6">
            <Info size={18} />
            <span>
              PDF export is only available from the app page. Exports include a screenshot of your
              3D scene, your stage dimensions, and your full input channel list.
            </span>
          </div>

          <section>
            <h3 className="mb-4">How to Export</h3>
            <p className="text-secondary mb-4">
              Navigate to the app page and open the Utilities drawer at the bottom of the screen.
              Inside the drawer, click the <strong>Export to PDF</strong> button. Your browser's
              file manager will open — name the file whatever you'd like and save it to your machine.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">What's Included</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: <Camera size={14} />, text: 'A screenshot of your 3D scene at the time of export' },
                { icon: <FileDown size={14} />, text: 'A table containing your stage dimensions and configuration' },
                { icon: <FileDown size={14} />, text: 'A table containing your full input channel list' },
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
            <h3 className="mb-4">Camera Positioning</h3>
            <div className="alert alert-success">
              <Info size={18} />
              <span>
                The scene screenshot always reflects your current camera position at the moment
                you click Export to PDF. Position your camera before exporting to capture the
                best view of your plot.
              </span>
            </div>
          </section>
        </div>
      </div>
    </>,
    document.body
  );
};
