import { useState } from 'react';
import { createPortal } from 'react-dom';
import { type ElementPlacement } from '../../api/elementPlacement';
import * as THREE from 'three'
export interface ElementPositionProps {
  onClose: () => void;
  onSuccess: (x: number, y: number, z: number) => void;
  initialPosition: THREE.Vector3 | null;
}


export const ElementPositionModal = ({ onClose, onSuccess, initialPosition }: ElementPositionProps) => {
  const [elementPlacementForm, setElementPlacementForm] = useState<Partial<ElementPlacement>>({
    positionX: initialPosition?.x,
    positionY: initialPosition?.y,
    positionZ: initialPosition?.z,
  })

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div>
          <label>Position X</label>
          <input
            type="number"
            value={elementPlacementForm.positionX ?? ''}
            onChange={e => setElementPlacementForm(prev => ({ ...prev, positionX: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div>
          <label>Position Y</label>
          <input
            type="number"
            value={elementPlacementForm.positionY ?? ''}
            onChange={e => setElementPlacementForm(prev => ({ ...prev, positionY: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div>
          <label>Position Z</label>
          <input
            type="number"
            value={elementPlacementForm.positionZ ?? ''}
            onChange={e => setElementPlacementForm(prev => ({ ...prev, positionZ: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => onSuccess(
          elementPlacementForm.positionX ?? 0,
          elementPlacementForm.positionY ?? 0,
          elementPlacementForm.positionZ ?? 0,
        )}>Confirm</button>
      </div>
    </div>,
    document.body
  )
}
