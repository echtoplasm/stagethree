import { useState, useEffect } from 'react';
import { createUser } from '../../api/users';
import { UserPlus, X } from 'lucide-react';
interface UserCreateProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const UserCreate = ({ onClose, onSuccess }: UserCreateProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log('UserCreate called');
  }, [])

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
      console.error(err);
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
            <div className="alert alert-error mb-4">{error}</div>
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
                  <div className="spinner" style={{ width: '16px', height: '16px' }} />
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
