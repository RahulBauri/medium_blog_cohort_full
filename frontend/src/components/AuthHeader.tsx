import { Link } from 'react-router-dom';

const AuthHeader = ({ type }: { type: 'signup' | 'signin' }) => {
  return (
    <div className='flex flex-col justify-center items-center p-8'>
      <div className='text-3xl font-extrabold'>
        {type === 'signup' ? 'Create an account' : 'Login to your account'}
      </div>
      <div className='font-light'>
        {type === 'signup'
          ? 'Already have an account?'
          : "Don't have an account?"}
        <span></span>
        <Link
          className='underline'
          to={type === 'signup' ? '/signin' : '/signup'}
        >
          {type === 'signup' ? 'Login' : 'Sign up'}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
