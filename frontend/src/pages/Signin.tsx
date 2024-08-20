import Quote from '../components/Quote';
import AuthSignin from '../components/AuthSignin';

const Signin = () => {
  return (
    <div className='flex justify-center px-44'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <AuthSignin type='signin' />
        <div className='hidden lg:block'>
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
