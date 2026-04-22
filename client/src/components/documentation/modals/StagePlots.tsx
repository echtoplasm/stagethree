import { createPortal } from 'react-dom';
import { X, Info, LayoutTemplate, Lock } from 'lucide-react';
import { Divider } from '../utilityComponents/Divider';
export interface StagePlotsDocsProps {
  onClose: () => void;
}


/**
 * Renders a documentation modal component about stage plots
 *
 * @param onClose - React props callback function to determine what happens onClose
 * @returns A react portal of JSX for rendering modal
 */
export const StagePlotsDocs = ({ onClose }: StagePlotsDocsProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Stage Plots</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">

          <div className="alert mb-6">
            <Info size={18} />
            <span>
              A stage plot is your working document — it lives inside a project, references a
              stage, and is where all of your element placements and input channel data lives.
            </span>
          </div>

          <section>
            <h3 className="mb-4">What is a Stage Plot</h3>
            <p className="text-secondary mb-4">
              A stage plot is the core unit of work in StageThree. It represents a single
              production setup, the arrangement of equipment on a stage for a specific show,
              event, or configuration. Every stage plot is tied to a stage, which defines the
              physical dimensions of the 3D scene you're plotting in.
            </p>
            <p className="text-secondary">
              Think of it like this: a venue is the building, a stage is
              the platform inside that building, and a stage plot is what you put
              on that platform for a given show.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">How it Fits Together</h3>
            <ul className="docs-list">
              {[
                { label: 'Project', description: 'The top level container. A project groups one or more stage plots together — for example a tour, a festival, or a recurring event.' },
                { label: 'Stage', description: 'The physical platform your plot is built on. Defines the width, depth, and height of your 3D scene.' },
                { label: 'Stage Plot', description: 'Lives inside a project and references a stage. Contains all of your element placements and input channel assignments.' },
              ].map((item) => (
                <li key={item.label} className="text-secondary docs-list-item">
                  <LayoutTemplate size={14} className="docs-list-icon" />
                  <span>{item.label}: {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Creating a Stage Plot</h3>
            <p className="text-secondary mb-4">
              Stage plots can be created in two ways. From the User Portal,
              expand any project and click Add Plot,  you'll be prompted to
              select a venue and stage, name your plot, and optionally add a gig date.
            </p>
            <p className="text-secondary">
              You can also create a plot directly from the Stage Templates page.
              Find a public stage you want to use, click Use This Stage, and
              you'll be walked through selecting or creating a project and naming your plot before
              being dropped straight into the 3D plotting environment.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Gig Date</h3>
            <p className="text-secondary">
              When creating a plot you have the option to add a gig date. This is purely
              organizational — it displays alongside your plot name in the User Portal to help
              you identify which plot corresponds to which show. It has no effect on the
              3D scene or any other functionality.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Sandbox Limitations</h3>
            <div className="alert">
              <Lock size={18} />
              <span>
                Creating and saving stage plots requires an account. In sandbox mode you can
                explore the 3D plotting environment but nothing will be saved and you cannot
                create a plot tied to a project or stage.
              </span>
            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  );
};
