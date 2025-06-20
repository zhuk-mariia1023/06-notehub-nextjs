'use client';

type ErrorNoteProps = {
  error: Error;
  reset: () => void;
};
const ErrorComponent = ({ error }: ErrorNoteProps) => {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
    </>
  );
};

export default ErrorComponent;
