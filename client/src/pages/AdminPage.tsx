import { StageTable } from "../components/shared/stage/StageTable";
import { UserTable } from "../components/admin/UserTable";
import { ImageTable } from "../components/admin/3dModels/ModelTable"

/**
 * Admin dashboard page composing user, stage, and 3D model management tables.
 *
 * @returns The admin page layout with UserTable, StageTable, and ImageTable sections.
 */
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

