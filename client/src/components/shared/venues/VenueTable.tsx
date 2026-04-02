import { useState, useEffect } from 'react';
import { Box, Trash, Plus, Pencil } from 'lucide-react';
import type { Venue } from '../../../api/venues';
import { getVenuesByUserId } from '../../../api/venues';
import { VenueUpdate } from './VenueUpdate';
import { VenueDelete } from './VenueDelete';
import { VenueCreate } from './VenueCreate';
import { useAuth } from '../../../contexts/AuthContext';

export function VenueTable() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [deleteVenue, setVenueDelete] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [venueCreate, setVenueCreate] = useState(false);
  const { user } = useAuth();
  if (!user) return null;

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

  const resetVenueState = async () => {
    const data = await getVenuesByUserId(user.id);
    setVenues(data);
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
          <h1>Manage Your Venues</h1>
          <p className="text-secondary mb-4">Here are all of the Venues associated with your account</p>
          <button className="btn btn-primary" onClick={() => setVenueCreate(true)}>
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
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Capacity</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map(venue => (
                  <tr key={venue.id}>
                    <td>{venue.id}</td>
                    <td>{venue.name}</td>
                    <td>{venue.address}</td>
                    <td>{venue.city}</td>
                    <td>{venue.capacity}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => { setSelectedVenue(venue); setVenueDelete(true); }}
                      >
                        <Trash size={16} /> Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-update btn-sm'
                        onClick={() => { setSelectedVenue(venue); setUpdate(true); }}
                      >
                        <Pencil size={16} /> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>            </table>
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
    </div >
  );
}

