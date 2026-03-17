import { useState } from "react";
import { useStageContext } from "../../contexts/StageContext";
import { updateInputChannel } from "../../api/inputChannel";
import { X, Plus, Minus, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { createPortal } from "react-dom";
import { type InputChannel } from "../../api/inputChannel";

interface InputChannelModalProps {
  onClose: () => void;
}

export const InputChannelModal = ({ onClose }: InputChannelModalProps) => {
  const { inputChannels, setInputChannels } = useStageContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<InputChannel>>({});
  const [sortAsc, setSortAsc] = useState(true);

  const handleEdit = (ic: typeof inputChannels[0]) => {
    setEditingId(ic.id);
    setEditData({ ...ic });
  };

  const handleChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id: number) => {
    const updated = await updateInputChannel(id, editData);
    setInputChannels(inputChannels.map((ic: InputChannel) => ic.id === id ? updated : ic));
    setEditingId(null);
  };

  const incrementChannel = async (ic: InputChannel) => {
    const updated = await updateInputChannel(ic.id, { channelNumber: ic.channelNumber + 1 });
    setInputChannels(inputChannels.map((c: InputChannel) => c.id === ic.id ? updated : c));
  };

  const decrementChannel = async (ic: InputChannel) => {
    const updated = await updateInputChannel(ic.id, { channelNumber: ic.channelNumber - 1 });
    setInputChannels(inputChannels.map((c: InputChannel) => c.id === ic.id ? updated : c));
  };

  const sortedChannels = [...inputChannels].sort((a, b) => sortAsc ? a.channelNumber - b.channelNumber : b.channelNumber - a.channelNumber)

  return createPortal(
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal modal-scrollable modal-wide">
        <div className="modal-header">
          <div>
            <h2>Input Channels</h2>
            <p className="text-secondary">Adjust your input channels</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSortAsc(prev => !prev)}>
              {sortAsc ? <ArrowUpNarrowWide size={16} /> : <ArrowDownWideNarrow size={16} />}
              Ch. {sortAsc ? 'Asc' : 'Desc'}
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
                <th>Channel Number</th>
                <th>Instrument</th>
                <th>Mic / DI</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedChannels.map((ic) => (
                <tr key={ic.id} onClick={() => handleEdit(ic)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => { e.stopPropagation(); decrementChannel(ic); }}
                      >
                        <Minus size={12} />
                      </button>
                      {editingId === ic.id ?
                        <input
                          type="number"
                          className="form-input"
                          value={editData.channelNumber}
                          onChange={e => handleChange('channelNumber', +e.target.value)}
                          style={{ width: '48px', MozAppearance: 'textfield' }} />

                        : ic.channelNumber
                      }
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => { e.stopPropagation(); incrementChannel(ic); }}>
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input
                        className="form-input"
                        value={editData.instrumentName}
                        onChange={e => handleChange('instrumentName', e.target.value)}
                      />
                      : ic.instrumentName}
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input
                        className="form-input"
                        value={editData.micType ?? ''}
                        onChange={e => handleChange('micType', e.target.value)}
                      />
                      : ic.micType}
                  </td>
                  <td>
                    {editingId === ic.id
                      ? <input
                        className="form-input"
                        value={editData.notes ?? ''}
                        onChange={e => handleChange('notes', e.target.value)}
                      />
                      : ic.notes ?? '—'}
                  </td>
                  <td>
                    {editingId === ic.id && (
                      <button className="btn btn-sm" onClick={() => handleSave(ic.id)}>Save</button>
                    )}
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
