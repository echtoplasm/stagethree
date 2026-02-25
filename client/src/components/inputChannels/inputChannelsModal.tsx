import {  useStageContext } from "../../contexts/StageContext";
import { X } from "lucide-react";
interface InputChannelModalProps {
  onClose: () => void;
}


/*** TODO add the ability to adjust the input channels in the modal ***/
export const InputChannelModal = ({ onClose }: InputChannelModalProps) => {

  const { inputChannels } = useStageContext();

  return (


    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Input Channels</h2>
            <p className="text-secondary">Adjust your input channels</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="input-channel-drawer">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Instrument</th>
                <th>Mic / DI</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {inputChannels.map((ic) => (
                <tr key={ic.id}>
                  <td>{ic.channelNumber}</td>
                  <td>{ic.instrumentName}</td>
                  <td>{ic.micType}</td>
                  <td>{ic.notes ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
