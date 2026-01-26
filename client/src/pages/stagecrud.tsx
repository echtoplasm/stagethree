import { useState, useEffect } from 'react';
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
        console.log('recieved data:', data);
        console.log('Is array?', Array.isArray(data));
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading stages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stages Test</h1>
          <p className="text-gray-600 mt-2">Fetched {stages.length} stages from API</p>
        </div>

        {stages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No stages found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stages.map(stage => (
              <div 
                key={stage.stage_id}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">{stage.name}</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Width: {stage.width}ft</p>
                  <p>Depth: {stage.depth}ft</p>
                  {stage.height && <p>Height: {stage.height}ft</p>}
                  <p className="text-xs text-gray-400 mt-2">
                    ID: {stage.stage_id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
