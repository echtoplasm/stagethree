import { StageTable } from "../components/shared/stage/StageTable";
import { UserTable } from "../components/admin/UserTable";
export const AdminPage = () => {


  return (
    <div>
      <section>
        <UserTable />
      </section>
      <section>
        <h2>Stage Section</h2>
        <StageTable />

      </section>
      <section>

      </section>
    </div>
  )
}

