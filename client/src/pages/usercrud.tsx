import { useEffect, useState } from "react";
import { Trash2, UserPlus, Users as UsersIcon } from "lucide-react";
import type { User } from "src/types/user";
import { getUsers, deleteUser, createUser } from "../api/users";

export function UserCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createUser({
        email_usr: email,
        password_hash_usr: password, 
        first_name_usr: firstName,
        last_name_usr: lastName,
        is_active_usr: true
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      await fetchUsers();
      setError(null);
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      await deleteUser(id);
      await fetchUsers();
      setError(null);
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading && users.length === 0) {
    return (
      <div className="page-container flex-center">
        <div className="text-center">
          <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto 1rem' }} />
          <p className="text-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper-narrow">
        <header className="mb-8">
          <h1>User Management</h1>
          <p className="text-secondary">Create and manage user accounts</p>
        </header>

        {error && (
          <div className="alert alert-error mb-6">
            {error}
          </div>
        )}

        <section className="card mb-6">
          <div className="card-header">
            <h2>Create New User</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 mb-4">
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
                  placeholder="Doe"
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
                  Create User
                </>
              )}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="card-header flex-between">
            <h2>Users ({users.length})</h2>
          </div>

          {users.length === 0 ? (
            <div className="empty-state">
              <UsersIcon size={64} />
              <p>No users found. Create your first user above!</p>
            </div>
          ) : (
            <ul className="list">
              {users.map((user) => (
                <li key={user.id_usr} className="list-item">
                  <div className="flex-between">
                    <div className="flex gap-4">
                      <div className="avatar">
                        {user.first_name_usr.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.first_name_usr} {user.last_name_usr}</p>
                        <p className="text-muted">{user.email_usr}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(user.id_usr)}
                      disabled={loading}
                      className="btn btn-ghost btn-danger"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
