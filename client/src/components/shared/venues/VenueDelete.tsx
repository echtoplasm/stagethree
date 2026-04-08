import { type Venue, deleteVenue } from '../../../api/venues';

interface VenueDeleteProps {
  venue: Venue;
  onClose: () => void;
}

/**
 * Confirmation modal for deleting a venue.
 *
 * @param venue - The venue to be deleted.
 * @param onClose - Callback invoked when the modal is dismissed or the deletion completes.
 * @returns The delete confirmation modal.
 */
export function VenueDelete({ venue, onClose }: VenueDeleteProps) {

/** Deletes the venue by ID and calls onClose on completion. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteVenue(venue.id);
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
            <h2>Delete Venue?</h2>
            <p className="text-danger">Are you sure you want to delete venue?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>No, Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div >
    </>
  );
}
