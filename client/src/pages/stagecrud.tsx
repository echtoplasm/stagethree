import { useState, useEffect } from 'react';
import { Box, Ruler, Layers } from 'lucide-react';
import type { Stage } from 'src/api/stages';
import { fetchAllStages } from '../api/stages';

export function StageCrud() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          <h1>Stage Templates</h1>
          <p className="text-secondary">Browse available stage configurations</p>
        </header>

        {stages.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No stage templates found</p>
          </div>
        ) : (
          <div className="stages-grid">
            {stages.map(stage => (
              <article key={stage.id_stg} className="stage-card">
                <div className="stage-card-header">
                  <Box size={24} />
                  <h2>{stage.name_stg}</h2>
                </div>
                
                <div className="stage-dimensions">
                  <div className="dimension">
                    <Ruler size={16} />
                    <span className="dimension-label">Width</span>
                    <span className="dimension-value">{stage.width_stg} ft</span>
                  </div>
                  
                  <div className="dimension">
                    <Ruler size={16} />
                    <span className="dimension-label">Depth</span>
                    <span className="dimension-value">{stage.depth_stg} ft</span>
                  </div>
                  
                  {stage.height_stg && (
                    <div className="dimension">
                      <Layers size={16} />
                      <span className="dimension-label">Height</span>
                      <span className="dimension-value">{stage.height_stg} ft</span>
                    </div>
                  )}
                </div>

                <div className="stage-card-footer">
                  <span className="text-muted">ID: {stage.id_stg}</span>
                  <button className="btn btn-ghost btn-sm">View Details</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
