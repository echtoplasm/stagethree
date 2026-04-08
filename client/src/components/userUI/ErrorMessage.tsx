export interface ErrorMessageProps {
  error: string;
}


/**
 * Renders a styled error alert containing the provided error message.
 *
 * @param error - The error message string to display.
 * @returns An error alert element.
 */
export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div className="alert alert-error">
      <span>{error}</span>
    </div>
  );
};
