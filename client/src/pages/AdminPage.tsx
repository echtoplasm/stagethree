import { UserCrud} from "../components/usercrud";
import {StageDelete} from "../components/shared/stage/StageDelete";
import {StageCreate} from "../components/shared/stage/StageCreate"
export const AdminPage = () => {


  return (
    <div>
      <section>
        <UserCrud />
      </section>
      <section>
        <h2>Stage Section</h2>
        <StageDelete />
        <StageCreate />

      </section>
      <section>
       
      </section>
    </div>
  )
}

