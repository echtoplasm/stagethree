import { createPortal } from "react-dom"


/**
 * Portal-rendered modal informing the user their screen size is too small to use the application.
 *
 * @returns A blocking modal portal mounted to document.body.
 */
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
