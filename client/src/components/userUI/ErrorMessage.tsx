export interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className="alert alert-error">
      <span>{error}</span>
    </div>
  );
};
