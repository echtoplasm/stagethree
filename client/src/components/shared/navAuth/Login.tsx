import { useState } from "react";
import { X, LogIn } from "lucide-react";
import { loginUser } from "../../../api/auth";
import { type User } from "../../../types/api";
import { ErrorMessage } from "../../../components/userUI/ErrorMessage";
interface LoginProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

/**
 * Modal form for authenticating an existing user.
 * Displays an error alert on failed login without clearing the form.
 *
 * @param onClose - Callback invoked when the modal is dismissed.
 * @param onSuccess - Callback invoked with the authenticated user on successful login.
 * @returns The login modal with email/password fields and submit handling.
 */
export function Login({ onClose, onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Submits email and password credentials to the auth API.
   * Calls onSuccess with the returned user on success, or sets error state on failure.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      setError(null);
      onSuccess(res.user);
    } catch (err) {
      setError("Unable to Log in");
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Sign In</h2>
            <p className="text-secondary">Welcome back to StageThree</p>
          </div>
          <button aria-label="Close modal." className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {error && (
            <ErrorMessage error={error} />
          )}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <LogIn size={18} />
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
