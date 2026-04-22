import { useState, useEffect } from "react";
import { getUsers } from "../../api/users";
import { type User } from "../../types/api"
import { UserCreate } from "./UserCreate"
import { UserUpdate } from "./UserUpdate";
import { Plus, Trash, Pencil } from "lucide-react";
import { UserDelete } from "./UserDelete";
import { ErrorMessage } from "../userUI/ErrorMessage";

export const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCreate, setUserCreate] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const roleLabel: Record<number, string> = {
    1: 'User',
    2: 'Admin',
    3: 'Super User',
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  if (error) {
    return <ErrorMessage error={error} />
  }


  if (loading && users.length === 0) {
    return (
      <div className="flex-center">
        <div className="text-center">
          <div className="spinner"/>
          <p className="text-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
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

        <div className="card admin-table-card">
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
                  <td>{roleLabel[user.roleId] ?? 'User'}</td>
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
            userUpdate={selectedUser}
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
