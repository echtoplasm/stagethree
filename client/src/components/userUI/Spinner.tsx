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
