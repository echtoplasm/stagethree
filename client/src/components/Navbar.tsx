import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          PERN App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/stage" className='nav-link'>
              threedstage
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
