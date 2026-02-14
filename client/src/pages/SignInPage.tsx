import { useState } from "react";
import { UserPlus } from "lucide-react";
//import type { User } from "src/types/user";
import { loginUser } from "../api/auth";

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser(email, password)
      setEmail('');
      setPassword('');
      setError(null);
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    } finally {
      setLoading(false);
      console.log('sucessful sign in')
    }
  };

  if (loading) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading users...</p>
        </div>
      </div>
    );

    if (error) {
      return (
        <div className="page-container flex-center">
          <div className="text-center">
            {error}
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
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
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px' }} />
              Creating...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Log In
            </>
          )}
        </button>
      </form>
    </div>
  );
}
