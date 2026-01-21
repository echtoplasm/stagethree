import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-bold hover:text-gray-300">
            StageThree
          </Link>
          
          {/* Navigation Links */}
          <ul className="flex gap-4">
            <li className='mx-6'>
              <Link 
                to="/users" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Users
              </Link>
            </li>
            <li className='mx-6'>
              <Link 
                to="/posts" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Posts
              </Link>
            </li>
            <div className='px-8'>
            <li className='mx-6'>
              <Link 
                to="/stage" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                3D Stage
              </Link>
            </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
