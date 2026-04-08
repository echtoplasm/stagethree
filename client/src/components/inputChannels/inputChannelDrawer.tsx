import { useStageContext } from "../../contexts/StageContext";
import { useAuth } from "../../contexts/AuthContext";
import { Info } from "lucide-react"

/**
 * Component for inputchannel drawer in the bottom drawer of plotting page
 * 
 * @returns JSX to render HTML to browser
 */
export const InputChannelDrawer = () => {
  
  //grabbing input channels state from stage context provider
  const { inputChannels } = useStageContext();
  
  //retrieving authenticated state from context provider
  const { isAuthenticated } = useAuth();

  const isSandbox = !isAuthenticated;

  return (
    <div>
      {!isSandbox ? (
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
      ) : (

        <div className="alert mb-6">
          <Info size={18} />
          <span>
            You cannot use the input channel features of StageThree while in sandbox mode. You must sign in or sign up to exit sandbox mode.
          </span>
        </div>
      )}

    </div>
  )
}
