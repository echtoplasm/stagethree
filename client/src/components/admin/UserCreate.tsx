import { useState } from 'react';
import { createUser } from '../../api/users';
import { UserPlus, X } from 'lucide-react';
import { ErrorMessage } from '../userUI/ErrorMessage';

interface UserCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Modal form for creating a new user account from the admin portal.
 * Handles form state, submission, loading, and error display.
 * Calls onSuccess and resets form fields on successful creation.
 *
 * @param onClose - Callback to close the modal without making changes.
 * @param onSuccess - Callback invoked after a user is successfully created.
 */
export const UserCreate = ({ onClose, onSuccess }: UserCreateProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  /**
   * Submits the form to create a new user.
   * Resets all fields on success. Sets an error message on failure.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      onSuccess();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setError(null);
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Create New User</h2>
            <p className="text-secondary">Fill out the form below to create a user</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {error && (
            <ErrorMessage error={error} />
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input id="firstName" type="text" className="form-input"
                placeholder="John" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" className="form-input"
                placeholder="Doe" value={lastName}
                onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input"
                placeholder="john@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" type="password" className="form-input"
                placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner spinner-sm" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
