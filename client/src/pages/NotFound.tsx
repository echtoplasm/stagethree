import { Link } from 'react-router-dom';

/**
 * 404 not found page. Displays when a route does not match any defined paths.
 */
export function NotFound() {
  return (
    <div className="not-found">
      <div className="logo-icon not-found-logo">S3</div>
      <h1 className="not-found-code">404</h1>
      <h2>Page not found</h2>
      <p className="text-secondary">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go home</Link>
    </div>
  );
}
