import { Link } from 'react-router-dom';
import { UserPlus, Box, Boxes, LogIn, UserMinus } from 'lucide-react';
import { type User } from '../types/api';
import { useState, useEffect } from 'react';
import { fetchAuthMe, logoutUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
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
      navigate('/');
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
            <Link to="/stages">
              <Boxes size={18} />
              Stages
            </Link>
          </li>


          {!isAuthenticated && (
            <li>
              <Link to="/signup">
                <UserPlus size={18} />
                Sign Up
              </Link>
            </li>
          )}

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
