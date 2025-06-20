'use client';

type Props = {
  error: Error;
  reset: () => void;
};
const ErrorComponent = ({ error }: Props) => {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
    </>
  );
};

export default ErrorComponent;
