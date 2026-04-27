/**
 * Full-page centered loading spinner with a 'Loading...' label.
 * Used as an early return during data fetch operations.
 */
export const Spinner = () => {
  return (
    <div className="flex-center">
      <div className="text-center">
        <div className="spinner-container">
          <div className="spinner" />
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    </div>
  );
}
