import { deleteStagePlot } from '../../api/stagePlots';
import { createPortal } from 'react-dom';

interface PlotDeleteProps {
  plotId: number | null;
  onSuccess: () => void;
  onClose: () => void;
}

/**
 * React component to render a warning to the user about deleting a plot
 * @param  - PlotDeleteProps, passing the props defined above contains callback functions  
 * 
 * @returns - React Portal contianing jsx to render the warning to the user 
 */
export const PlotDelete = ({ plotId, onSuccess, onClose }: PlotDeleteProps) => {

  /**
   * Handle submit and recieves plotId from parent component to pass the plot to client/api
   * delete stageplot function 
   * 
   * @param e - Form event 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    if (!plotId) return null;
    e.preventDefault();
    await deleteStagePlot(plotId);
    onSuccess();
  }

  return createPortal(
    <>
      <div className='modal-backdrop' onClick={onClose} />
      <div className='modal'>
        <div className='modal-header'>
          <div>
            <h2>Delete Plot?</h2>
            <p className='text-secondary'>Are you sure you want to delete the plot?</p>
          </div>
        </div>

        <div className='modal-footer'>
          <button className='btn btn-ghost' onClick={onClose}>No, cancel</button>
          <button className='btn btn-danger btn-sm' onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div>
    </>, document.body
  )
}
