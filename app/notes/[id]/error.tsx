'use client';

type ErrorIdProps = {
  error: Error;
  reset: () => void;
};
const ErrorComponentId = ({ error, reset }: ErrorIdProps) => {
  return (
    <>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default ErrorComponentId;
