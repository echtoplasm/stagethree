
import { useAuth } from '../contexts/AuthContext';
import { StageTable } from '../components/shared/stage/StageTable';


export const UserPortal = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        <div>
          <h2>Hello, {user?.firstName}</h2>
          <span className='text-secondary text-small'>Stay awhile</span>
        </div>
        <div>
          <StageTable />
        </div>
      </div>
    </>
  )
}
