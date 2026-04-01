import { useStageContext } from "../../contexts/StageContext";
import { useAuth } from "../../contexts/AuthContext";
import {Info} from "lucide-react"
export const InputChannelDrawer = () => {
  //*** TODO add editable dropdown menus for input channels ***//
  const { inputChannels } = useStageContext();
  const { isAuthenticated } = useAuth();

  const isSandbox = !isAuthenticated;

  return (
    <div>
      {!isSandbox && (
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
      )}

      <div className="alert mb-6">
        <Info size={18} />
        <span>
          You cannot use the input channel features of StageThree while in sandbox mode. You must sign in or sign up to exit sandbox mode.
        </span>
      </div>


    </div>
  )
}
