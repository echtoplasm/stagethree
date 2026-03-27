import { StageTable } from "../components/shared/stage/StageTable";
import { UserTable } from "../components/admin/UserTable";
import { ImageTable } from "../components/admin/3dModels/ModelTable"
export const AdminPage = () => {


  return (
    <div className="page-container">
      <section className="mb-2">
        <UserTable />
      </section>
      <section className="mt-2">
        <StageTable />

      </section>
      <section>
        <ImageTable />
      </section>
    </div>
  )
}

