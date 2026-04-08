import { useState } from 'react';
import { createPortal } from 'react-dom';
import { type ElementPlacement } from '../../api/elementPlacement';
import * as THREE from 'three'

export interface ElementPositionProps {
  onClose: () => void;
  onSuccess: (x: number, y: number, z: number) => void;
  initialPosition: THREE.Vector3 | null;
}

/**
 * Portal-rendered modal for manually editing an element's X/Y/Z position in the Three.js scene.
 * Seeds input fields from the element's current world position.
 *
 * @param onClose - Callback invoked when the modal is dismissed.
 * @param onSuccess - Callback invoked with the updated x, y, z coordinates on confirm.
 * @param initialPosition - The element's current Three.js world position, used to seed the form.
 * @returns A position editor modal portal mounted to document.body.
 */
export const ElementPositionModal = ({ onClose, onSuccess, initialPosition }: ElementPositionProps) => {
  const [elementPlacementForm, setElementPlacementForm] = useState<Partial<ElementPlacement>>({
    positionX: initialPosition?.x,
    positionY: initialPosition?.y,
    positionZ: initialPosition?.z,
  })

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Position</h2>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Position X</label>
            <input
              className="form-input"
              type="number"
              value={elementPlacementForm.positionX ?? ''}
              onChange={e => setElementPlacementForm(prev => ({ ...prev, positionX: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Position Y</label>
            <input
              className="form-input"
              type="number"
              value={elementPlacementForm.positionY ?? ''}
              onChange={e => setElementPlacementForm(prev => ({ ...prev, positionY: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Position Z</label>
            <input
              className="form-input"
              type="number"
              value={elementPlacementForm.positionZ ?? ''}
              onChange={e => setElementPlacementForm(prev => ({ ...prev, positionZ: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSuccess(
            elementPlacementForm.positionX ?? 0,
            elementPlacementForm.positionY ?? 0,
            elementPlacementForm.positionZ ?? 0,
          )}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
