import { useState } from 'react';
import { X } from 'lucide-react';
import { type Venue, updateVenue } from '../../../api/venues';

interface VenueUpdateProps {
  venue: Venue;
  onClose: () => void;
}

/**
 * Modal form for updating an existing venue's name, address, city, and capacity.
 * Initializes form state from the provided venue and calls onClose after a successful update.
 *
 * @param venue - The venue to edit, used to seed initial form state.
 * @param onClose - Callback invoked when the modal is dismissed or the update completes.
 * @returns The update venue modal with name, address, city, and capacity fields.
 */
export function VenueUpdate({ venue, onClose }: VenueUpdateProps) {
  const [venueForm, setVenueForm] = useState<Omit<Venue, 'createdAt'>>({
    id: venue.id,
    name: venue.name,
    address: venue.address,
    city: venue.city,
    stateId: venue.stateId,
    capacity: venue.capacity,
    createdBy: venue.createdBy
  });

  /** Submits the updated venue form and calls onClose on completion. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateVenue(venueForm.id, venueForm);
    onClose();
  }


  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Update Venue</h2>
            <p className="text-secondary">Edit the venue dimensions and name</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Venue Name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={venueForm.name}
              onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="address">Address</label>
            <input
              id="address"
              className="form-input"
              type="text"
              value={venueForm.address}
              onChange={(e) => setVenueForm({ ...venueForm, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input
              id="city"
              className="form-input"
              type="text"
              value={venueForm.city}
              onChange={(e) => setVenueForm({ ...venueForm, city: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              className="form-input"
              type="number"
              value={venueForm.capacity}
              onChange={(e) => setVenueForm({ ...venueForm, capacity: Number(e.target.value) })}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </>
  );
}
