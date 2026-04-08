import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import type { Venue } from '../../../api/venues';
import { getVenuesByUserId } from '../../../api/venues';
import { VenueUpdate } from './VenueUpdate';
import { VenueDelete } from './VenueDelete';
import { VenueCreate } from './VenueCreate';
import { useAuth } from '../../../contexts/AuthContext';
import { type Stage, getStagesByVenueId } from '../../../api/stages'
import { StageCreate } from '../stage/StageCreate';
import { StageDelete } from '../stage/StageDelete';
import { StageUpdate } from '../stage/StageUpdate';


/**
 * Displays all venues belonging to the authenticated user with expandable stage rows.
 * Handles venue and stage CRUD operations and renders loading and error states while fetching.
 * Returns null if no authenticated user is present.
 *
 * @returns The venue management table with nested stage rows and CRUD modals.
 */
export function VenueTable() {

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [update, setUpdate] = useState(false);
  const [deleteVenue, setVenueDelete] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [venueCreate, setVenueCreate] = useState(false);

  // *** *** STAGE state management *** ***
  const [stages, setStages] = useState<Stage[]>([])
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  //stage component states
  const [showStages, setShowStages] = useState(false);
  const [stageCreate, setStageCreate] = useState(false);
  const [stageUpdate, setStageUpdate] = useState(false);
  const [stageDelete, setStageDelete] = useState(false);



  //Initialize user state from auth context
  const { user } = useAuth();
  if (!user) return null;

  /**
   * Fetches all venues for the authenticated user on mount and updates loading and error state accordingly.
   */
  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);
        const data = await getVenuesByUserId(user.id);
        setVenues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Venues');
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [user]);

  /** Refreshes the venue list after any CRUD operation. */
  const resetVenueState = async () => {
    const data = await getVenuesByUserId(user.id);
    setVenues(data);
  }

  /**
   * Fetches all stages for the given venue and expands the stage row dropdown.
   *
   * @param venueId - The ID of the venue whose stages should be loaded.
   */
  const getVenueStages = async (venueId: number) => {
    const data = await getStagesByVenueId(venueId);
    setStages(data);
    console.log(stages);
    setShowStages(true);
  }

  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading Venues...</p>
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
          <h1>Manage Your Venues and Stages</h1>
          <p className="text-secondary mb-4">Here are all of the Venues associated with your account, click on a venue to see the associated stages with it. You can create venues and stages together in one place here.</p>
          <button aria-label="Create new venue." className="btn btn-primary" onClick={() => setVenueCreate(true)}>
            <Plus size={18} />
            Create New Venue
          </button>
        </header>
        {venues.length === 0 ? (
          <div className="empty-state">
            <Box size={64} />
            <p>No Venue templates found</p>
          </div>
        ) : (
          <div className='card'>
            {venues.map(venue => (
              <div key={venue.id}>
                <div className='project-row' onClick={() => {
                  setSelectedVenue(venue);
                  if (selectedVenue?.id === venue.id) {
                    setShowStages(!showStages);
                  } else {
                    setSelectedVenue(venue);
                    getVenueStages(venue.id);
                    setShowStages(true);
                  }

                }}>
                  <span className='icon'><Box size={18} /></span>
                  <div style={{ flex: 1 }}>
                    <span className='name'>{venue.name}</span>
                    {venue.city && <span className='text-muted' style={{ marginLeft: '0.5rem' }}>{venue.city}</span>}
                    {venue.address && <span className='text-muted' style={{ marginLeft: '0.5rem' }}>— {venue.address}</span>}
                  </div>
                  {venue.capacity && <span className='text-secondary' style={{ fontSize: '0.8rem' }}>cap. {venue.capacity.toLocaleString()}</span>}
                  <button aria-label="Delete venue." className='btn btn-danger btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedVenue(venue); setVenueDelete(true); }}>
                    <Trash size={16} />
                  </button>
                  <button aria-label="Update venue." className='btn btn-update btn-sm' onClick={(e) => { e.stopPropagation(); setSelectedVenue(venue); setUpdate(true); }}>
                    <Pencil size={16} />
                  </button>
                </div>

                {showStages && selectedVenue?.id === venue.id && (
                  <div style={{ marginLeft: '2.75rem', borderLeft: '1px solid var(--border-accent)', paddingBottom: '0.5rem' }}>
                    {stages.map(stage => (
                      <div key={stage.id} className='plot-row'>
                        <span style={{ flex: 1 }}>{stage.name}</span>
                        <span className='text-muted'>{stage.width}ft × {stage.depth}ft × {stage.height}ft</span>
                        <button aria-label="Delete stage." className='btn btn-danger btn-sm plot-delete' onClick={() => { setSelectedStage(stage); setStageDelete(true); }}>
                          <Trash size={14} />
                        </button>
                        <button aria-label="Update stage." className='btn btn-update btn-sm plot-update' onClick={() => { setSelectedStage(stage); setStageUpdate(true); }}>
                          <Pencil size={14} />
                        </button>
                      </div>
                    ))}
                    <button aria-label="Create new stage." className='btn btn-ghost btn-sm' style={{ margin: '0.25rem 0.5rem' }} onClick={() => setStageCreate(true)}>
                      <Plus size={14} /> Add Stage
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {update && selectedVenue && (
        <VenueUpdate
          venue={selectedVenue}
          onClose={() => {
            resetVenueState();
            setUpdate(false);
            setSelectedVenue(null);
          }}
        />
      )}

      {deleteVenue && selectedVenue && (
        <VenueDelete
          venue={selectedVenue}
          onClose={async () => {
            resetVenueState();
            setVenueDelete(false);
            setSelectedVenue(null);
          }}

        />
      )}

      {venueCreate && (
        <VenueCreate
          onSuccess={async () => {
            resetVenueState();
            setVenueCreate(false)

          }}
          onClose={() => setVenueCreate(false)}
        />
      )}

      {stageCreate && selectedVenue && (
        <StageCreate
          venueId={selectedVenue.id}
          onClose={() => setStageCreate(false)}
          onSuccess={() => {
            getVenueStages(selectedVenue.id)
            setStageCreate(false)
          }} />
      )}

      {stageUpdate && selectedStage && selectedVenue && (
        <StageUpdate
          stage={selectedStage}
          onClose={() => {
            getVenueStages(selectedVenue.id)
            setStageUpdate(false)
            setSelectedStage(null)
          }}
        />
      )}

      {stageDelete && selectedStage && selectedVenue && (
        <StageDelete
          stage={selectedStage}
          onClose={() => {
            getVenueStages(selectedVenue.id)
            setStageDelete(false)
            setSelectedStage(null)
          }}
        />
      )}
    </div >
  );
}

