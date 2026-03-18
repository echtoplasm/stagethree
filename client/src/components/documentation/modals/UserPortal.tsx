import { createPortal } from "react-dom";
import { X, TriangleAlert, Info } from "lucide-react";

export interface UserPortalDocProps {
  onClose: () => void;
}

const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
)

export const UserPortalDocModal = ({ onClose }: UserPortalDocProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>User Portal</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">

          {/* Section: Overview */}
          <section>
            <h3 className="mb-4">User Portal Functionality</h3>
            <p className="text-secondary">
              From within the user portal you can view and manage any stages you have imported to
              the app, as well as manage your projects and associated stage plots.
            </p>
          </section>

          <Divider />

          {/* Section: Updating stages */}
          <section>
            <h3 className="mb-4">Updating stages</h3>
            <p className="text-secondary mb-2">
              To update a stage, click the <strong>update button</strong> next to the pencil icon.
              This will open a card where you can modify the stage name and dimensions.
            </p>
            <p className="text-secondary">
              When you are done making changes, click <strong>Save changes</strong> inside the card
              to confirm.
            </p>
          </section>

          <Divider />

          {/* Section: Deleting stages */}
          <section>
            <h3 className="mb-4">Deleting stages</h3>
            <p className="text-secondary mb-4">
              To remove a stage, click the <strong>delete button</strong> with the trashcan icon
              next to the stage you want to remove.
            </p>
            <div className="alert mb-2">
              <Info size={18} />
              <span>
                If other users have stage plots referencing one of your stages and you delete it,
                those stage plots may be affected. See the <strong>known issues</strong> section for
                more information.
              </span>
            </div>
          </section>

          <Divider />

          {/* Section: Creating stages */}
          <section>
            <h3 className="mb-4">Creating stages</h3>
            <p className="text-secondary mb-2">
              At the top of the <strong>Manage Your Stages</strong> card, click the{' '}
              <strong>Create New Stage</strong> button. Fill out the form with your stage name,
              dimensions, and any other applicable information, then click{' '}
              <strong>Create Stage</strong> to confirm.
            </p>
            <p className="text-secondary">
              Your new stage will appear in your stages table immediately.
            </p>
          </section>

          <Divider />

          {/* Section: Managing projects */}
          <section>
            <h3 className="mb-4">Managing projects</h3>
            <p className="text-secondary mb-4">
              Within the <strong>Manage Your Projects</strong> card you can create, update, and
              delete projects. To view stage plots associated with a project, click the{' '}
              <strong>Plots</strong> button, which will open a dropdown beneath that project's row.
            </p>
            <div className="alert mb-2">
              <TriangleAlert size={18} />
              <span>
                Deleting a project will also permanently delete all stage plots associated with it.
              </span>
            </div>
          </section>

          <Divider />

          {/* Section: Managing stage plots */}
          <section>
            <h3 className="mb-4">Managing stage plots</h3>
            <p className="text-secondary">
              When the stage plots dropdown is open for a project, you will see the same update and
              delete controls available for each plot. These work the same way as the project
              controls described above.
            </p>
          </section>

        </div>
      </div>
    </>,
    document.body
  )
}
