import { Link } from 'react-router-dom';
import { UserPlus, Boxes, LogIn, UserMinus, ShieldUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './shared/navAuth/Login';
import { SignUp } from './shared/navAuth/Signup';
import { useState } from 'react';

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <>
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
                <button onClick={() => setShowSignUp(true)} className='btn'>
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogOut} className='btn'>
                  <UserMinus size={18} />
                  Logout {user?.firstName}
                </button>
              </li>
            ) : (
              <li>
                <button className="btn" onClick={() => setShowLogin(true)}>
                  <LogIn size={18} /> Sign In
                </button>
              </li>
            )}
            {(user?.roleId ?? 0) >= 2 && (
              <li>
                <Link to="/admin">
                  <ShieldUser size={18} />
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSuccess={(user) => {
            login(user);
            setShowLogin(false);
          }}
        />
      )}
      {showSignUp && (
        <SignUp onClose={() => setShowSignUp(false)} onSuccess={() => setShowSignUp(false)} />
      )}
    </>
  );
}
