import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface CustomBackGroundModalProps {
  onSuccess: (backgroundColor: string) => void;
  onClose: () => void;
  bgColor: string;
}

/**
 * Portal-rendered modal for selecting a custom Three.js scene background color.
 *
 * @param onSuccess - Callback invoked with the selected hex color string when the user applies their choice.
 * @param onClose - Callback invoked when the modal is dismissed.
 * @param bgColor - The current background color used to seed the color picker.
 * @returns A color picker modal portal mounted to document.body.
 */
export const CustomBackGroundModal = ({ onSuccess, onClose, bgColor }: CustomBackGroundModalProps) => {
  const [backgroundColor, setBackgroundColor] = useState(bgColor)
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <h2>Custom Background Color</h2>
          <button aria-label='Close modal.' className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor='bg-color-picker'>Select Color</label>
            <input
              id="bg-color-picker"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <p className="text-secondary">Selected hex: {backgroundColor}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSuccess(backgroundColor)}>Apply</button>
        </div>
      </div>
    </>,
    document.body
  )
}
