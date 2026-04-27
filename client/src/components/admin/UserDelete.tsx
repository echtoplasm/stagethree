import { deleteUser } from '../../api/users';
import { type User } from '../../types/api';

interface UserDeleteProps {
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Confirmation modal for deleting a user account from the admin portal.
 * Renders nothing if no user is selected.
 *
 * @param user - The user to be deleted, or null if no user is selected.
 * @param onClose - Callback to close the modal without making changes.
 * @param onSuccess - Callback invoked after the user is successfully deleted.
 */
export function UserDelete({ user, onClose, onSuccess }: UserDeleteProps) {

  if (!user) return null;

  /**
   * Submits the delete request for the selected user and triggers onSuccess.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteUser(user.id);
    onSuccess();
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
            <h2>Delete User?</h2>
            <p className="text-danger">Are you sure you want to delete User?</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>No, Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleSubmit}>Yes, Delete</button>
        </div>
      </div>
    </>
  );
}
