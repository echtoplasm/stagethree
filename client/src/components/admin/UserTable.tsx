import { useState, useEffect } from "react";
import { getUsers } from "../../api/users";
import { type User } from "../../types/api"
import { UserCreate } from "./UserCreate"
import { UserUpdate } from "./UserUpdate";
import { Plus, Trash, Pencil } from "lucide-react";
import { UserDelete } from "./UserDelete";


export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userCreate, setUserCreate] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  if (error) {
    return (
      <div>
        <div className="page-container flex-center">
          <div className="text-center">
            <h2 className="text-danger">Error</h2>
          </div>
        </div>
      </div>
    )
  }

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
      <div className="content-wrapper">
        <header className="admin-header mb-8">
          <div>
            <h1>Users Management</h1>
            <p className="text-secondary">Manage all registered users</p>
          </div>
          <button className="btn btn-primary" onClick={() => setUserCreate(true)}>
            <Plus size={18} />
            Create New User
          </button>
        </header>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.roleId === 2 ? 'Admin' : 'User'}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm btn-ghost"
                      onClick={() => {
                        setSelectedUser(user)
                        setUserUpdate(true)
                      }
                      }>
                      <Pencil size={16} />
                    </button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => {
                        setSelectedUser(user)
                        setUserDelete(true)
                      }}>
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {userCreate && (
          <UserCreate
            onClose={() => setUserCreate(false)}
            onSuccess={() => {
              fetchUsers()
              setUserCreate(false);
            }}


          />
        )}

        {userUpdate && (
          <UserUpdate
            user={selectedUser}
            onClose={() => setUserUpdate(false)}
            onSuccess={() => {
              fetchUsers()
              setUserUpdate(false)
            }}
          />
        )}

        {userDelete && (
          <UserDelete
            user={selectedUser}
            onClose={() => setUserDelete(false)}
            onSuccess={() => {
              fetchUsers()
              setUserDelete(false)
            }}
          />
        )}
      </div>
    </div>
  );


}
