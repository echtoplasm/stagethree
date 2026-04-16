import { useState, useEffect } from 'react';
import { Box, Ruler, Layers } from 'lucide-react';
import { fetchAllPublicStages, type PublicStage } from '../../../api/stages';


/**
 * Displays a grid of all publicly available stage templates with their dimensions.
 * Renders loading and error states while fetching.
 *
 * @returns The stage templates grid, or a loading/error state.
 */
export function StageRead() {
  const [stages, setStages] = useState<PublicStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [minDepth, setMinDepth] = useState('');

  const filteredStages = stages.filter(stage => {
    const matchesName = stage.name.toLowerCase().includes(search.toLowerCase());
    const matchesWidth = minWidth === '' || stage.width >= Number(minWidth);
    const matchesDepth = minDepth === '' || stage.depth >= Number(minDepth);
    return matchesName && matchesWidth && matchesDepth;
  });

  /**
   * Fetches all public stages on mount and updates loading and error state accordingly.
   */
  useEffect(() => {
    const loadStages = async () => {
      try {
        setLoading(true);
        const data = await fetchAllPublicStages();
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
          <p className="text-secondary">Browse available public stage configurations</p>
          <div className="stage-search">
            <div className="stage-search-name">
              <label htmlFor="searchStage" className="form-label">Stage Name</label>
              <input
                type="text"
                id="searchStage"
                className="form-input"
                placeholder="Filter by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="stage-search-dimension">
              <label htmlFor="minWidth" className="form-label">Min Width (ft)</label>
              <input
                type="number"
                id="minWidth"
                className="form-input"
                placeholder="Any"
                value={minWidth}
                onChange={e => setMinWidth(e.target.value)}
              />
            </div>
            <div className="stage-search-dimension">
              <label htmlFor="minDepth" className="form-label">Min Depth (ft)</label>
              <input
                type="number"
                id="minDepth"
                className="form-input"
                placeholder="Any"
                value={minDepth}
                onChange={e => setMinDepth(e.target.value)}
              />
            </div>
          </div>
        </header>
        {filteredStages.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>
              {stages.length === 0
                ? 'No stage templates found'
                : 'No stages match your search'}
            </p>
          </div>
        ) : (
          <div className="stages-grid">
            {filteredStages.map(stage => (
              <article key={stage.id} className="stage-card">
                <div className="stage-card-header">
                  <Box size={24} />
                  <div>
                    <h2>{stage.name}</h2>
                    {stage.venueName && (
                      <p className="text-muted">
                        {stage.venueName}{stage.city && `, ${stage.city}`}{stage.state && `, ${stage.state}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="stage-dimensions">
                  <div className="dimension">
                    <Ruler size={16} />
                    <span className="dimension-label">Width</span>
                    <span className="dimension-value">{stage.width} ft</span>
                  </div>
                  <div className="dimension">
                    <Ruler size={16} />
                    <span className="dimension-label">Depth</span>
                    <span className="dimension-value">{stage.depth} ft</span>
                  </div>
                  {stage.height && (
                    <div className="dimension">
                      <Layers size={16} />
                      <span className="dimension-label">Height</span>
                      <span className="dimension-value">{stage.height} ft</span>
                    </div>
                  )}
                  {stage.capacity && (
                    <div className="dimension">
                      <Layers size={16} />
                      <span className="dimension-label">Capacity</span>
                      <span className="dimension-value">{stage.capacity.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </article>))}
          </div>
        )}
      </div>
    </div>
  );
}
