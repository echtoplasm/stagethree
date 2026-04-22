import { createPortal } from 'react-dom';
import { X, Info, MapPin, Lock } from 'lucide-react';
import { Divider } from '../utilityComponents/Divider';
export interface VenuesDocsProps {
  onClose: () => void;
}

/**
 * Divider component for rendering a line break within the modal
 */


/**
 * Renders a documentation modal component about managing venues
 *
 * @param onClose - React props callback function to determine what happens onClose
 * @returns A react portal of JSX for rendering modal
 */
export const VenuesDocs = ({ onClose }: VenuesDocsProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Venues</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">

          {/* Overview banner */}
          <div className="alert mb-6">
            <Info size={18} />
            <span>
              Venues are the physical locations that house your stages. Every stage in StageThree
              belongs to a venue — creating a venue is the first step before adding your own stages.
            </span>
          </div>

          <section>
            <h3 className="mb-4">What is a Venue</h3>
            <p className="text-secondary mb-4">
              A venue represents a real-world location such as an amphitheater, arena, club, festival
              grounds, or any space where a stage exists. Venues store the location details that
              give your stages context, including the name, address, city, state, and capacity.
            </p>
            <p className="text-secondary">
              When you browse the Stage Templates page you'll see venue information displayed
              on each card, this comes from the venue associated with that stage. Stages without
              a venue will display their dimensions only.
            </p>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Managing Venues in the User Portal</h3>
            <p className="text-secondary mb-4">
              All venue management lives in the User Portal, accessible from the
              navigation bar. Inside the portal you'll find a Venues section that lists all venues
              associated with your account. From here you can:
            </p>
            <ul className="docs-list">
              {[
                { label: 'Create a venue', description: 'Add a new venue with a name, address, city, state, and capacity.' },
                { label: 'Edit a venue', description: 'Update any venue details at any time.' },
                { label: 'Delete a venue', description: 'Remove a venue from your account. Any stages associated with that venue will remain but will no longer have venue context.' },
                { label: 'Expand a venue', description: 'Click a venue row to expand it and view all stages attached to that venue, and manage them directly.' },
              ].map((item) => (
                <li key={item.label} className="docs-list-item text-secondary">
                  <MapPin size={14} className="docs-list-icon" />
                  <span><strong>{item.label}:</strong> {item.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          <section>
            <h3 className="mb-4">Venues and Stages</h3>
            <p className="text-secondary mb-4">
              Stages are created under a venue in the User Portal. When you expand a venue row
              you'll see all stages attached to it and have the option to add new ones, edit
              existing ones, or delete them. A venue can have multiple stages — for example a
              festival grounds might have a main stage, a second stage, and an acoustic stage all
              under the same venue.
            </p>
            <p className="text-secondary">
              If you mark a stage as Public when creating it, that stage will
              appear in the Stage Templates page with your venue's name, city, and state displayed
              on the card, visible to all StageThree users.
            </p>
          </section>

          <Divider />

          {/* Section: Sandbox limitation */}
          <section>
            <h3 className="mb-4">Sandbox Limitations</h3>
            <div className="alert">
              <Lock size={18} />
              <span>
                Creating and managing venues requires an account. Sandbox mode does not include
                access to the User Portal or any venue management features.
              </span>
            </div>
          </section>

        </div>
      </div>
    </>,
    document.body
  );
};
