import { Link } from 'react-router-dom';
import { Users, UserPlus, Box, Boxes, LogIn } from 'lucide-react';

export function Navbar() {
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
        <li>
            <Link to="/signin">
              <LogIn size={18} />
              Log In
            </Link>
          </li>
      </ul>
    </div>
  </nav >
  );
}
