import { Link } from 'react-router-dom';
import { Users, UserPlus, Box, Boxes, LogIn, UserMinus } from 'lucide-react';
import { type User } from '../types/api';
import { useState, useEffect } from 'react';
import { fetchAuthMe, logoutUser } from '../api/auth';

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();


  const authenticate = async () => {
    const authRes = await fetchAuthMe();
    if (authRes?.apiUser) {
      setIsAuthenticated(true);
      setUser(authRes.apiUser)
    }
    console.log(isAuthenticated);
  }

  const handleLogOut = async () => {
    try {
      logoutUser();
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  useEffect(() => {
    authenticate();
  }, []);


  return (
    <nav>
      <div>
        <Link to="/">
          <span className="logo-icon">S3</span>
          <span>StageThree</span>
        </Link>

        <ul>
          <li>
            <Link to="/users">
              <Users size={18} />
              Users
            </Link>
          </li>
          <li>
            <Link to="/stages">
              <Boxes size={18} />
              Stages
            </Link>
          </li>
          <li>
            <Link to="/stage">
              <Box size={18} />
              3D Stage
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <UserPlus size={18} />
              Sign Up
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <button onClick={handleLogOut}>
                <UserMinus size={18} />
                Logout {user?.firstName}
              </button>
            </li>
          ) : (

            <li>
              <Link to="/signin">
                <LogIn size={18} />
                Log In
              </Link>
            </li>
          )}



        </ul>
      </div>
    </nav >
  );
}
