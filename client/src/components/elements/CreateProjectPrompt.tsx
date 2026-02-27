import { X } from "lucide-react";

interface PromptProjProps {
  onClose: () => void;
}

export const PromptProjectCreate = ({ onClose }: PromptProjProps) => {

  const closeHandleClick = () => {
    onClose();
  }
  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <div>
          <h2>Plese create a project to plot</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={closeHandleClick}>
            <X size={18} />
          </button>
        </div>
        <section className="modal-footer">
          <p>You can create a project by opening the left hand tab and clicking create project</p>
        </section>
      </div>
    </>
  )
}
