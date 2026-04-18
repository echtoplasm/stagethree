import { createPortal } from 'react-dom';
import { X, Info, Theater, Lock } from 'lucide-react';
import { Divider } from '../utilityComponents/Divider';
export interface StagesDocsProps {
  onClose: () => void;
}


/**
 * Renders a documentation modal component about managing stages
 *
 * @param onClose - React props callback function to determine what happens onClose
 * @returns A react portal of JSX for rendering modal
 */
export const StagesDocs = ({ onClose }: StagesDocsProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Stages</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">

          <div className="alert mb-6">
            <Info size={18} />
            <span>
              A stage is the physical platform your plot is built on. Every stage plot in
              StageThree requires a stage — it defines the dimensions of your 3D scene.
            </span>
          </div>

          {/* Section: Stage Templates */}
          <section>
            <h3 className="mb-4">Stage Templates</h3>
            <p className="text-secondary mb-4">
              The <strong>Stage Templates</strong> page is accessible from the navigation bar and
              displays all publicly available stages. These are real-world venues and standard
              configurations contributed by StageThree users. You can filter templates by name,
              minimum width, and minimum depth to find one that fits your needs.
            </p>
            <p className="text-secondary">
              Once you find a stage you want to use, click <strong>Use This Stage</strong> on the
              card. You'll be prompted to select an existing project or create a new one, name your
              plot, and optionally add a gig date. After confirming, you'll be taken directly into
              the 3D plotting environment with that stage loaded.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Managing Your Own Stages</h3>
            <p className="text-secondary mb-4">
              You can create and manage your own stages from the <strong>User Portal</strong> under
              the Venues section. Stages in StageThree are associated with a venue — to create a
              stage you first need a venue to attach it to.
            </p>
            <p className="text-secondary">
              When creating a stage you'll provide a name, width, depth, and height in feet. You
              can also set the stage visibility to <strong>Public</strong> or <strong>Private</strong>.
              Public stages will appear in the Stage Templates page and be available to all users.
              Private stages are only visible to you.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Stage Dimensions</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Width', description: 'The left-to-right measurement of the stage in feet.' },
                { label: 'Depth', description: 'The front-to-back measurement of the stage in feet.' },
                { label: 'Height', description: 'The height of the stage platform from the floor in feet.' },
              ].map((item) => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }} className="text-secondary">
                  <Theater size={14} style={{ marginTop: '3px', flexShrink: 0 }} />
                  <span><strong>{item.label}:</strong> {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Sandbox Limitations</h3>
            <div className="alert">
              <Lock size={18} />
              <span>
                Creating and managing stages requires an account. In sandbox mode you can browse
                public stage templates but cannot create, edit, or delete stages.
              </span>
            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  );
};
