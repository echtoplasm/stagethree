import { useStageContext } from "../../contexts/StageContext";

export const InputChannelDrawer = () => {
  //*** TODO add editable dropdown menus for input channels ***//
  const { inputChannels } = useStageContext();
  return (
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
  )
}
