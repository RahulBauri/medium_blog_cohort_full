import React from 'react';
import Spinner from './Spinner';

interface SubmitType {
  type: 'signup' | 'signin';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSubmitting: boolean;
}
const SubmitButton = ({ type, onClick, isSubmitting }: SubmitType) => {
  return (
    <button
      onClick={onClick}
      className='bg-gray-900 text-white w-full px-2 py-4 rounded-md text-center cursor-pointer flex justify-center hover:bg-gray-700'
      disabled={isSubmitting}
    >
      {isSubmitting ? <Spinner /> : type === 'signup' ? 'Sign up' : 'Sign in'}
    </button>
  );
};

export default SubmitButton;
