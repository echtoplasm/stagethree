import { useState } from "react";
import { X, LogIn } from "lucide-react";
import { Turnstile } from '@marsidev/react-turnstile'
import { createUser } from '../../../api/users'
import { loginUser } from "../../../api/auth";
import { type User } from "../../../types/api";
interface SignUpProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

/**NEED TO IMPLEMENT CAPTCHA**/
export function SignUp({ onClose, onSuccess }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');

  const SPECIAL_CHARS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '?'];

  const hasSpecialChar = (password: string) => SPECIAL_CHARS.some(char => password.includes(char));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password.length < 8 || !hasSpecialChar(password)) {
        setError('Password must be at least 8 characters and contain at least one special character.');
      } else {
        await createUser({ email, password, firstName, lastName, turnstileToken });
        const res = await loginUser(email, password);
        onSuccess(res.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Sign Up</h2>
            <p className="text-secondary">Welcome to StageThree</p>
          </div>
          <button aria-label="Close modal" className="btn btn-ghost btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              className="form-input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
            <Turnstile
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              className="turnstile"
              options={{
                theme: 'dark',
                size: 'normal'
              }}
            />
          </div>

          {error && (
            <div role="alert" className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <LogIn size={18} />
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
