import { useState } from "react";
import { useStageContext } from "../../contexts/StageContext";
import { updateInputChannel } from "../../api/inputChannel";
import { Pencil, X, Plus, Minus } from "lucide-react";
import { createPortal } from "react-dom";
import { type InputChannel } from "../../api/inputChannel";

interface InputChannelModalProps {
  onClose: () => void;
}

/**
 * Component for redndering a modal that contains a table to edit inputchannels information
 *  
 * @param  - React Props callback function for handling what happens on Modal close
 * @returns - JSX table containing input channel information and editable fields  
 */
export const InputChannelModal = ({ onClose }: InputChannelModalProps) => {
  const { inputChannels, setInputChannels } = useStageContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<InputChannel>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);


  /**
   * function for handling changed data to the input channel by populating
   * state with information about the inputchannel to be edited
   * 
   * @param ic - inputChannel to capture state in order to edit
   */
  const handleEdit = (ic: typeof inputChannels[0]) => {
    setEditingId(ic.id);
    setEditData({ ...ic });
  };

  /**
   * Updates the state of the data to be changed 
   * 
   * @param field - the field to be changed on an input channel 
   * @param value - the value to be passed and associated with the field
   */
  const handleChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };



  /**
   * Passes the newly changed data to the client/api update function for input channel
   * to pass new input channel data to backend
   * 
   * updates inputchannel state with the newly updated inputchannel
   *
   * sets id of input channel to be edited state back to null
   *
   * @param id - id of input channel to be saved
   */
  const handleSave = async (id: number) => {
    const updated = await updateInputChannel(id, editData);
    setInputChannels(inputChannels.map((ic: InputChannel) => ic.id === id ? updated : ic));
    setEditingId(null);
  };

  /**
   * Increments inputchannel number and passes to backend
   * 
   * @param ic - InputChannel to have channel number increment
   */
  const incrementChannel = async (ic: InputChannel) => {
    const updated = await updateInputChannel(ic.id, { channelNumber: ic.channelNumber + 1 });
    setInputChannels(inputChannels.map((c: InputChannel) => c.id === ic.id ? updated : c));
  };

  /**
     * Decrements inputchannel number and passes to backend
     * 
     * @param ic - InputChannel to have channel number decrement
     */
  const decrementChannel = async (ic: InputChannel) => {
    const updated = await updateInputChannel(ic.id, { channelNumber: ic.channelNumber - 1 });
    setInputChannels(inputChannels.map((c: InputChannel) => c.id === ic.id ? updated : c));
  };



  /** 
   * Sorting algorithm for inputchannel numbers to sort by ascending or descending
   *
   * returns - conditionals returns based on sortorder state
   */
  const sortedChannels = [...inputChannels].sort((a, b) => {
    if (sortOrder === 'asc') return a.channelNumber - b.channelNumber;
    if (sortOrder === 'desc') return b.channelNumber - a.channelNumber;
    return 0;
  });



  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-scrollable modal-wide">
        <div className="modal-header">
          <div>
            <h2>Input Channels</h2>
            <p className="text-secondary">Click any row to edit</p>
          </div>
          <div className="modal-header-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setSortOrder('asc')}>
              Sort Asc.
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setSortOrder('desc')}>
              Sort Desc.
            </button>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="input-channel-drawer">
          <table className="table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Instrument</th>
                <th>Mic / DI</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedChannels.map((ic) => (
                <tr
                  key={ic.id}
                  className={`table-row-editable ${editingId === ic.id ? 'table-row-editing' : ''}`}
                  onClick={() => handleEdit(ic)}
                >
                  <td>
                    <div className="channel-number-cell">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => { e.stopPropagation(); decrementChannel(ic); }}
                      >
                        <Minus size={12} />
                      </button>
                      {editingId === ic.id
                        ? <input
                          type="number"
                          className="form-input input-narrow"
                          value={editData.channelNumber}
                          onChange={e => handleChange('channelNumber', +e.target.value)}
                        />
                        : ic.channelNumber
                      }
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => { e.stopPropagation(); incrementChannel(ic); }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input className="form-input" value={editData.instrumentName} onChange={e => handleChange('instrumentName', e.target.value)} />
                      : ic.instrumentName}
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input className="form-input" value={editData.micType ?? ''} onChange={e => handleChange('micType', e.target.value)} />
                      : ic.micType}
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input className="form-input" value={editData.notes ?? ''} onChange={e => handleChange('notes', e.target.value)} />
                      : ic.notes ?? '—'}
                  </td>
                  <td className="table-row-action">
                    {editingId === ic.id
                      ? <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleSave(ic.id); }}>Save</button>
                      : <Pencil size={14} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>, document.body
  );
};
