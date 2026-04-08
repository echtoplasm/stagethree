import { useState } from 'react';
import { X } from 'lucide-react';
import { createVenue, type Venue } from '../../../api/venues';
import { useAuth } from '../../../contexts/AuthContext';
import { ErrorMessage } from '../../../components/userUI/ErrorMessage';


interface VenueCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}


/**
 * Modal form for creating a new venue.
 * Returns null if no authenticated user is present.
 *
 * @param onClose - Callback invoked when the modal is dismissed.
 * @param onSuccess - Callback invoked after the venue is successfully created.
 * @returns The create venue modal with name, address, city, and capacity fields.
 */
export function VenueCreate({ onClose, onSuccess }: VenueCreateProps) {
  //AUTH CHECK
  const { user } = useAuth();
  if (!user) return null

  //STATE MANAGEMENT
  const [stageForm, setVenueForm] = useState<Omit<Venue, 'id' | 'createdAt'>>({
    name: '',
    address: '',
    city: '',
    stateId: null,
    capacity: 0,
    createdBy: user.id
  });

  const [error, setError] = useState<string | null>(null);


  /** Submits the venue form and calls onSuccess on completion, or sets error state on failure. */
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await createVenue(stageForm);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Missing One or 2 fields for form submission')
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Create Venue</h2>
            <p className="text-secondary">Fill out the form below to create a venue</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/*error component*/}
        {error && (
          <ErrorMessage error={error} />
        )}

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Venue Name</label>
            <input id="name" className="form-input" type="text" value={stageForm.name}
              onChange={(e) => setVenueForm({ ...stageForm, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="address">Address</label>
            <input id="address" className="form-input" type="text" value={stageForm.address}
              onChange={(e) => setVenueForm({ ...stageForm, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="city">City</label>
            <input id="city" className="form-input" type="text" value={stageForm.city}
              onChange={(e) => setVenueForm({ ...stageForm, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="capacity">Capacity</label>
            <input id="capacity" className="form-input" type="number" max={100000} value={stageForm.capacity}
              onChange={(e) => setVenueForm({ ...stageForm, capacity: Number(e.target.value) })} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Venue</button>
          </div>
        </form>

      </div>
    </>
  );
}
