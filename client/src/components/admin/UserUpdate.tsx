import { useState } from 'react';
import { X } from 'lucide-react';
import { type User } from "../../types/api";
import { updateUser } from '../../api/users';
import { useAuth } from '../../contexts/AuthContext';
interface UserUpdateProps {
  userUpdate: User | null;
  onClose: () => void;
  onSuccess: () => void;
}


export function UserUpdate({ userUpdate, onClose, onSuccess }: UserUpdateProps) {
  const { user } = useAuth();
  if (!userUpdate) return null;
  const [userForm, setUserForm] = useState<User>({
    id: userUpdate.id,
    roleId: userUpdate.roleId,
    firstName: userUpdate.firstName,
    lastName: userUpdate.lastName,
    email: userUpdate.email,
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(userForm.id, userForm);
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
            <h2>Update User</h2>
            <p className="text-secondary">Edit the user information</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First name</label>
            <input
              id="name"
              className="form-input"
              type="text"
              value={userForm.firstName}
              onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className="form-input"
              type="text"
              value={userForm.lastName}
              onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="form-input"
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
          </div>



          {user?.roleId === 3 && (
            <div className="form-group">
              <label className="form-label" htmlFor="role">Role</label>
              <select
                id="role"
                className="form-select"
                value={userForm.roleId}
                onChange={(e) => setUserForm({ ...userForm, roleId: Number(e.target.value) })}
              >
                <option value={1}>User</option>
                <option value={2}>Admin</option>
                <option value={3}>Super User</option>
              </select>
            </div>
          )}






          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
