import { deleteUser } from '../../api/users';
import { type User } from '../../types/api';

interface UserDeleteProps {
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}


export function UserDelete({ user, onClose, onSuccess }: UserDeleteProps) {

 if(!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    deleteUser(user.id);
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
