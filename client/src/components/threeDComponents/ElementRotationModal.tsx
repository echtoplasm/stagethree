import { useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

export interface ElementRotationProps {
  onClose: () => void;
  onSuccess: (x: number, y: number, z: number) => void;
  initialRotation: THREE.Euler | null;
}

/**
 * Portal-rendered modal for manually editing an element's X/Y/Z rotation in the Three.js scene.
 * Converts between radians (Three.js internal) and degrees (user-facing) on input and confirm.
 *
 * @param onClose - Callback invoked when the modal is dismissed.
 * @param onSuccess - Callback invoked with the updated x, y, z rotation values in radians on confirm.
 * @param initialRotation - The element's current Three.js Euler rotation, used to seed the form.
 * @returns A rotation editor modal portal mounted to document.body.
 */
export const ElementRotationModal = ({ onClose, onSuccess, initialRotation }: ElementRotationProps) => {
  const [rotationForm, setRotationForm] = useState({
    x: initialRotation ? THREE.MathUtils.radToDeg(initialRotation.x) : 0,
    y: initialRotation ? THREE.MathUtils.radToDeg(initialRotation.y) : 0,
    z: initialRotation ? THREE.MathUtils.radToDeg(initialRotation.z) : 0,
  });

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Rotation</h2>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Rotation X (degrees)</label>
            <input className="form-input" type="number"
              value={rotationForm.x}
              onChange={e => setRotationForm(prev => ({ ...prev, x: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rotation Y (degrees)</label>
            <input className="form-input" type="number"
              value={rotationForm.y}
              onChange={e => setRotationForm(prev => ({ ...prev, y: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rotation Z (degrees)</label>
            <input className="form-input" type="number"
              value={rotationForm.z}
              onChange={e => setRotationForm(prev => ({ ...prev, z: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSuccess(
            THREE.MathUtils.degToRad(rotationForm.x),
            THREE.MathUtils.degToRad(rotationForm.y),
            THREE.MathUtils.degToRad(rotationForm.z),
          )}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  );
};
