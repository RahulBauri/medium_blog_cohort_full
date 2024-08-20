import React from 'react';
import Appbar from './Appbar';
import { Blog } from '../hooks';
import Avatar from './Avatar';

const SingleBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='grid grid-cols-12 w-9/12 max-w-screen-xl'>
          <div className='col-span-8 m-4 hover:bg-gray-100'>
            <div className='text-4xl font-extrabold'>{blog?.title}</div>
            <div className='font-light'>Posted on June 6, 2024</div>
            <div className='mt-4'>{blog?.content}</div>
          </div>
          <div className='col-span-4 m-4 hover:bg-gray-100'>
            <div className='font-semibold'>Author</div>
            <div className='flex justify-start items-center'>
              <div>
                <Avatar authorName={blog?.author.name} />
              </div>
              <div className='text-2xl font-bold ml-4'>
                <div>{blog?.author.name}</div>
                <div className='text-sm font-light'>
                  something about the author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
