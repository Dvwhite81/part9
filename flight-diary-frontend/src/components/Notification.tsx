import { ErrorProps } from '../types';

const Notification = ({ errorMessage }: ErrorProps) => {
  if (errorMessage === '') {
    return null;
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
};

export default Notification;
