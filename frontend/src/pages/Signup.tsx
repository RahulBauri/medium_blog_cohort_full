import Quote from '../components/Quote';
import AuthSignup from '../components/AuthSignup';

const Signup = () => {
  return (
    <div className='flex justify-center px-44'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <AuthSignup type='signup' />
        <div className='hidden lg:block'>
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signup;
