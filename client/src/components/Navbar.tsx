import { Link } from 'react-router-dom';
import { UserPlus, UserRoundCog, Boxes, LogIn, UserMinus, ShieldUser, Sun, Moon, Rotate3d, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './shared/navAuth/Login';
import { SignUp } from './shared/navAuth/Signup';
import { useState } from 'react';
import { type User } from '../types/api';

interface NavbarProps {
  onThemeToggle: () => void;
  theme: string;
}

/**
 * Global navigation bar with auth-aware controls and theme toggling.
 * Renders login/signup modals inline and redirects based on user role after authentication.
 *
 * @param onThemeToggle - Callback invoked when the user toggles light/dark mode.
 * @param theme - The current active theme, used to render the correct toggle icon.
 * @returns The navigation bar with links, auth controls, and theme toggle.
 */
export function Navbar({ onThemeToggle, theme }: NavbarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  /** Logs out the current user, clears auth state, and redirects to the home page. */
  const handleLogOut = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };
  
  /**
   * Updates auth context with the authenticated user and redirects based on role.
   * Users with roleId >= 2 are redirected to the admin panel, others to the app.
   *
   * @param user - The authenticated user returned from the login or signup flow.
   */
  const evaluateUser = (user: User) => {
    login(user);
    setShowLogin(false);
    user.roleId >= 2 ? navigate('/admin') : navigate('/app');
  }


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
            <li>
              <Link to="/app">
                <Rotate3d size={18} />
                App
              </Link>
            </li>
            <li>
              <Link to="/docs">
                <Paperclip size={18} />
                Docs
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
              <>
                <li>
                  <button onClick={handleLogOut} className='btn'>
                    <UserMinus size={18} />
                    Logout {user?.firstName}
                  </button>
                </li>
                <li>
                  <Link to="/portal">
                    <UserRoundCog size={18} />
                    Portal
                  </Link>
                </li>
              </>
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
            <div>
              <button
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={onThemeToggle}
              >
                {theme === 'dark' ? <Moon /> : <Sun />}
              </button>
            </div>
          </ul>
        </div>
      </nav>
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSuccess={(user) => { evaluateUser(user) }}
        />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSuccess={(user) => { evaluateUser(user); setShowSignUp(false) }}
        />
      )}
    </>
  );
}
