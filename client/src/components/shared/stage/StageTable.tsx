import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import type { Stage } from '../../../api/stages';
import { getStagesByUserId } from '../../../api/stages';
import { StageUpdate } from './StageUpdate';
import { StageDelete } from './StageDelete';
import { StageCreate } from './StageCreate';
import { useAuth } from '../../../contexts/AuthContext';


/**
 * Displays a table of all stages belonging to the authenticated user.
 * Handles stage CRUD operations and renders loading and error states while fetching.
 * Returns null if no authenticated user is present.
 *
 * @returns The stage management table with update/delete actions and a create modal.
 */
export function StageTable() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [deleteStage, setStageDelete] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [stageCreate, setStageCreate] = useState(false);
  const { user } = useAuth();
  if (!user) return null;

  /**
   * Fetches all stages for the authenticated user on mount and updates loading and error state accordingly.
   */
  useEffect(() => {
    const loadStages = async () => {
      try {
        setLoading(true);
        const data = await getStagesByUserId(user.id);
        setStages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stages');
      } finally {
        setLoading(false);
      }
    };

    loadStages();
  }, [user]);

  /** Refreshes the stage list after any CRUD operation. */
  const resetStageState = async () => {
    const data = await getStagesByUserId(user.id);
    setStages(data);
  }

  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className='spinner-container'>
            <div className="spinner" />
            <p className="text-secondary">Loading stages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex-center">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Manage Your Stages</h1>
          <p className="text-secondary mb-4">Here are all of the stages associated with your account</p>
          <button className="btn btn-primary" onClick={() => setStageCreate(true)}>
            <Plus size={18} />
            Create New Stage
          </button>
        </header>
        {stages.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No stage templates found</p>
          </div>
        ) : (
          <div className='card'>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Width</th>
                  <th>Depth</th>
                  <th>Height</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stages.map(stage => (
                  <tr key={stage.id}>
                    <td>{stage.id}</td>
                    <td>{stage.name}</td>
                    <td>{stage.width} ft</td>
                    <td>{stage.depth} ft</td>
                    <td>{stage.height ? `${stage.height} ft` : '—'}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setSelectedStage(stage)
                          setStageDelete(true)
                        }}
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-update btn-sm'
                        onClick={() => {
                          setSelectedStage(stage)
                          setUpdate(true)
                        }}
                      >
                        <Pencil size={16} />
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {update && selectedStage && (
        <StageUpdate
          stage={selectedStage}
          onClose={() => {
            resetStageState();
            setUpdate(false);
            setSelectedStage(null);
          }}
        />
      )}

      {deleteStage && selectedStage && (
        <StageDelete
          stage={selectedStage}
          onClose={async () => {
            resetStageState();
            setStageDelete(false);
            setSelectedStage(null);
          }}

        />
      )}


      {stageCreate && (
        <StageCreate
          onSuccess={async () => {
            resetStageState();
            setStageCreate(false)

          }}

          //***//
          //DOUBLE CHECK THIS VENUE ID NULL!
          //if there are any errors within the admin portal 
          //but really an admin should not be creating stages 
          //from the admin portal but from within their own user portal 
          //***//

          venueId={null!}
          onClose={() => setStageCreate(false)}
        />
      )}
    </div >
  );
}
