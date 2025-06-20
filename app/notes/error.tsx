'use client';

type ErrorNoteProps = {
  error: Error;
  reset: () => void;
};
const ErrorComponent = ({ error, reset }: ErrorNoteProps) => {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default ErrorComponent;
