import { createPortal } from "react-dom"
import { Lightbulb, MessageCircleWarning, Info, Check, X } from "lucide-react"
import { Divider } from "../utilityComponents/Divider";

interface PlottingDocModalProps {
  onClose: () => void;
}
 
 
export const PlottingDocModal = ({ onClose }: PlottingDocModalProps) => {
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-wide modal-scrollable">
        <div className="modal-header">
          <h2>Plotting</h2>
          <button aria-label="Exit modal." className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
 
        <div className="modal-body">
 
          {/* Tip banner */}
          <div className="alert alert-success mb-6">
            <Lightbulb size={18} />
            <span>
              Create an account to unlock the full StageThree experience, including saved projects,
              stage plots, and input channel editing.
            </span>
          </div>
 
          {/* Section: Plotting */}
          <section>
            <h3 className="mb-4">Plotting on the canvas</h3>
            <p className="text-secondary mb-2">
              Navigate to the app via the <strong>App</strong> button in the navigation bar. You will be
              greeted by a blank 3D canvas, ready for your stage plot.
            </p>
            <p className="text-secondary mb-2">
              To start adding elements, open the <strong>Elements tray</strong> from the bottom of the
              screen. Here you will find all currently available stage elements.
            </p>
            <p className="text-secondary">
              Clicking any element will place it into the 3D scene. As you add elements, the{' '}
              <strong>Stage Objects</strong> overlay in the top right will track each object and its
              position in the scene.
            </p>
          </section>
 
          <Divider />
 
          {/* Section: Input Channels */}
          <section>
            <div className="flex-between mb-4">
              <h3>Input channels</h3>
              <span className="badge badge-success">Login required</span>
            </div>
            <p className="text-secondary mb-2">
              With at least one element in the scene, open the <strong>Input Channels tray</strong>. You
              will see an input channel has been automatically created for your element.
            </p>
            <p className="text-secondary mb-2">
              Click the <strong>Expand to edit</strong> icon to open the full input channel list. From
              there, click any channel to reveal its editable fields and configure it to your needs.
            </p>
            <p className="text-secondary">
              Inside an expanded channel card you will find two controls in the top left: a{' '}
              <strong>sort button</strong> to toggle ascending or descending order, and an{' '}
              <strong>X button</strong> to close the card. You can also close it by clicking anywhere
              outside.
            </p>
          </section>
 
          <Divider />
 
          {/* Section: Saving projects */}
          <section>
            <div className="flex-between mb-4">
              <h3>Saving projects</h3>
              <span className="badge badge-success">Login required</span>
            </div>
            <p className="text-secondary mb-2">
              Open the <strong>Saved Projects</strong> tab on the left side of the canvas. When signed
              in, StageThree automatically creates a default project and plot as soon as you start
              plotting.
            </p>
            <div className="alert mb-4">
              <MessageCircleWarning size={18} />
              <span>
                Rename your default project and plot as soon as possible to avoid confusion later on.
              </span>
            </div>
            <p className="text-secondary">
              Click the <strong>pencil icon</strong> next to any project or plot name to edit its
              details, then click <strong>Save changes</strong> to confirm.
            </p>
          </section>
 
          <Divider />
 
          {/* Section: Creating a new project */}
          <section>
            <h3 className="mb-4">Creating a new project</h3>
            <p className="text-secondary">
              From the <strong>Saved Projects</strong> tab, click the{' '}
              <strong>Create a new project</strong> button at the top. Fill out the project details in
              the card that appears, then click <strong>Create Project</strong>. Your new project will
              appear in the file explorer immediately.
            </p>
          </section>
 
          <Divider />
 
          {/* Section: Adding a stage plot */}
          <section>
            <h3 className="mb-4">Adding a stage plot to a project</h3>
            <p className="text-secondary mb-2">
              Click your project in the file explorer to expand it, then click{' '}
              <strong>Create new plot</strong>. In the Create StagePlot card, choose a stage from the
              available options and give your plot a name.
            </p>
            <div className="alert mb-4">
              <Info size={18} />
              <span>
                You can associate any publicly available stage with your plot here. For importing your
                own custom stages, see the <strong>Stages</strong> documentation.
              </span>
            </div>
            <p className="text-secondary">
              Select the standard <strong>40x20 stage</strong> and click{' '}
              <strong>Create StagePlot</strong>. Once created, click your new plot to load it. The{' '}
              <strong>Current Stage</strong> overlay will update to reflect the active plot. Any elements
              you add from this point will be saved to your account automatically.
            </p>
          </section>
 
          <Divider />
 
          {/* Section: Autosave */}
          <section>
            <h3 className="mb-4">Autosave</h3>
            <div className="alert alert-success">
              <Check size={18} />
              <span>
                StageThree automatically saves your work. Adding elements or dragging them to a new
                position within an active plot is saved instantly, no manual save required.
              </span>
            </div>
          </section>
 
        </div>
      </div>
    </>,
    document.body
  )
}
 
