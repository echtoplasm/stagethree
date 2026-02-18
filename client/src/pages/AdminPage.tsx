import { UserCrud} from "../components/usercrud";
import {StageCreate} from "../components/shared/stage/StageCreate"
import { StageTable } from "../components/shared/stage/StageTable";
export const AdminPage = () => {


  return (
    <div>
      <section>
        <UserCrud />
      </section>
      <section>
        <h2>Stage Section</h2>
        <StageTable />
        <StageCreate />

      </section>
      <section>
       
      </section>
    </div>
  )
}

