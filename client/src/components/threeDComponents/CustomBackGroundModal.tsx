import { useState} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
interface CustomBackGroundModalProps {
  onSuccess: (backgroundColor : string) => void;
  onClose: () => void;
  bgColor: string;
}



export const CustomBackGroundModal = ({ onSuccess, onClose, bgColor }: CustomBackGroundModalProps) => {
  const [backgroundColor, setBackgroundColor] = useState(bgColor)
  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <h2>Custom Background Color</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Select Color</label>
            <input
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
