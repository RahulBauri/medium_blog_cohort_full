import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/blog/:id',
    element: <Blog />,
  },
  {
    path: '/blogs',
    element: <Blogs />,
  },
  {
    path: '/publish',
    element: <Publish />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
