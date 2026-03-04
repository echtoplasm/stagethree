import { createPortal } from "react-dom"

export function ScreenSizeModal() {
  return createPortal(
    <>
      <div
        className="modal-backdrop"
      />

      {/* Modal */}
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Screen Size Too Small</h2>
            <p className='text-secondary'>For the best experience you need a screen size that is larger to use our application</p>
          </div>
        </div>
        <div className="modal-footer">
          our apologies 
        </div>
      </div>
    </>, document.body
  )
}
