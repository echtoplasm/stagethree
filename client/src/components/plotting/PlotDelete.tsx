import { deleteStagePlot } from '../../api/stagePlots';

interface PlotDeleteProps {
  plotId: number | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const PlotDelete = ({ plotId, onSuccess, onClose }: PlotDeleteProps) => {

  console.log(`Plot delete recieved: PlotId :::`, plotId);

  const handleSubmit = async (e: React.FormEvent) => {
    if(!plotId) return null;
    e.preventDefault();
    await deleteStagePlot(plotId);
    onSuccess();
  }

  return (
    <>
      <div className='modal-backgrop' onClick={onClose} />
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
    </>
  )
}
