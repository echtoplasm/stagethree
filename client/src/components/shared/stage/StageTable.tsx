import { useState, useEffect } from 'react';
import { Box, Trash } from 'lucide-react';
import type { Stage } from '../../../api/stages';
import { fetchAllStages} from '../../../api/stages';
import { StageUpdate } from './StageUpdate';
import {StageDelete} from './StageDelete';

export function StageTable() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [deleteStage, setStageDelete] = useState(false);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)







  useEffect(() => {
    const loadStages = async () => {
      try {
        setLoading(true);
        const data = await fetchAllStages();
        setStages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stages');
      } finally {
        setLoading(false);
      }
    };

    loadStages();
  }, []);

  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading stages...</p>
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
    <div className="page-container">
      <div className="content-wrapper">
        <header className="mb-8">
          <h1>Delete Stage</h1>
          <p className="text-secondary">Select a stage to delete</p>
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
                  <th>Actions</th>
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
                        onClick={() =>{ 
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
                        className='btn btn-sm'
                        onClick={() => {
                          setSelectedStage(stage)
                          setUpdate(true)
                        }}
                      >
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
            setUpdate(false);
            setSelectedStage(null);
          }}
        />
      )}

      {deleteStage && selectedStage && (
        <StageDelete
          stage={selectedStage}
          onClose={() => {
            setStageDelete(false);
            setSelectedStage(null);
          }}
          
        />
      )}
    </div >
  );
}
