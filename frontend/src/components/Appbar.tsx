import { useState } from 'react';
import Avatar from './Avatar';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Appbar = () => {
  const loggedUserName = localStorage.getItem('loggedUserName') || 'X';

  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUserName');
    navigate('/signin');
    toast.success('user logged out successfully');
  };

  const login = () => {
    navigate('/signin');
  };
  return (
    <div className='flex justify-between items-center border-b px-10 py-4'>
      <Link to='/blogs'>
        <div className='cursor-pointer bg-green-500 hover:bg-green-400 py-2 px-8 rounded-2xl'>
          Medium
        </div>
      </Link>
      <div className='flex items-center'>
        <div className='mr-4 cursor-pointer bg-green-500 rounded-2xl w-16 py-1 hover:bg-green-400 text-center relative'>
          <Link to='/publish'>New</Link>
        </div>
        <div
          className='cursor-pointer flex flex-col'
          onClick={() => setClicked(!clicked)}
        >
          <Avatar authorName={loggedUserName} size='10' />
          <button
            onClick={localStorage.getItem('token') ? logout : login}
            className={`text-gray-100 px-2 absolute top-[60px] bg-red-500 rounded-2xl w-16 py-1 hover:bg-red-400 text-center  ${
              clicked ? '' : 'hidden'
            }`}
          >
            {localStorage.getItem('token') ? 'logout' : 'login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
