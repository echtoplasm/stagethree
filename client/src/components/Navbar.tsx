import { Link } from 'react-router-dom';
import { UserPlus, UserRoundCog, Boxes, LogIn, UserMinus, ShieldUser, Sun, Moon, Rotate3d, Paperclip, X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './shared/navAuth/Login';
import { SignUp } from './shared/navAuth/Signup';
import { useState, useEffect } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  /**
   * Logs out the current user, clears auth state, and redirects to the home page.
   * Closes the mobile menu on completion.
   */
  const handleLogOut = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
      closeMenu();
    } catch (err) {
      return;
    }
  };

  /**
   * Authenticates the user in context, closes any open modals, and redirects
   * based on role. Users with roleId >= 2 are sent to the admin panel, others to the app.
   *
   * @param user - The authenticated user returned from the login or signup flow.
   */
  const evaluateUser = (user: User) => {
    login(user);
    setShowLogin(false);
    closeMenu();
    user.roleId >= 2 ? navigate('/admin') : navigate('/app');
  };

  /**
   * Closes the mobile menu when the viewport exceeds 768px.
   * Prevents the menu from persisting if the user resizes from mobile to desktop.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav>
        <div>
          <Link to="/" onClick={closeMenu}>
            <span className="logo-icon">S3</span>
            <span>StageThree</span>
          </Link>

          {/* Desktop nav */}
          <ul className="nav-desktop">
            <li><Link to="/stages"><Boxes size={18} />Stages</Link></li>
            <li><Link to="/app"><Rotate3d size={18} />App</Link></li>
            <li><Link to="/docs"><Paperclip size={18} />Docs</Link></li>
            {!isAuthenticated && (
              <li>
                <button onClick={() => setShowSignUp(true)} className="btn">
                  <UserPlus size={18} />Sign Up
                </button>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <button onClick={handleLogOut} className="btn">
                    <UserMinus size={18} />Logout {user?.firstName}
                  </button>
                </li>
                <li><Link to="/portal"><UserRoundCog size={18} />Portal</Link></li>
              </>
            ) : (
              <li>
                <button className="btn" onClick={() => setShowLogin(true)}>
                  <LogIn size={18} />Sign In
                </button>
              </li>
            )}
            {(user?.roleId ?? 0) >= 2 && (
              <li><Link to="/admin"><ShieldUser size={18} />Admin</Link></li>
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

          {/* Mobile controls */}
          <div className="nav-mobile-controls">
            <button
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onThemeToggle}
            >
              {theme === 'dark' ? <Moon /> : <Sun />}
            </button>
            <button
              className="nav-hamburger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <ul className="nav-mobile-menu">
            <li><Link to="/stages" onClick={closeMenu}><Boxes size={18} />Stages</Link></li>
            <li><Link to="/app" onClick={closeMenu}><Rotate3d size={18} />App</Link></li>
            <li><Link to="/docs" onClick={closeMenu}><Paperclip size={18} />Docs</Link></li>
            {!isAuthenticated && (
              <li>
                <button onClick={() => { setShowSignUp(true); closeMenu(); }} className="btn">
                  <UserPlus size={18} />Sign Up
                </button>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li>
                  <button onClick={handleLogOut} className="btn">
                    <UserMinus size={18} />Logout {user?.firstName}
                  </button>
                </li>
                <li><Link to="/portal" onClick={closeMenu}><UserRoundCog size={18} />Portal</Link></li>
              </>
            ) : (
              <li>
                <button className="btn" onClick={() => { setShowLogin(true); closeMenu(); }}>
                  <LogIn size={18} />Sign In
                </button>
              </li>
            )}
            {(user?.roleId ?? 0) >= 2 && (
              <li><Link to="/admin" onClick={closeMenu}><ShieldUser size={18} />Admin</Link></li>
            )}
          </ul>
        )}
      </nav>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onSuccess={(user) => evaluateUser(user)} />
      )}
      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSuccess={(user) => { evaluateUser(user); setShowSignUp(false); }}
        />
      )}
    </>
  );
}
