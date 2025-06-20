'use client';

type ErrorIdProps = {
  error: Error;
  reset: () => void;
};
const ErrorComponentId = ({ error }: ErrorIdProps) => {
  return (
    <>
      <p>Could not fetch note details. {error.message}</p>
    </>
  );
};

export default ErrorComponentId;
