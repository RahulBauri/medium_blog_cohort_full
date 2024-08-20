import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import Appbar from '../components/Appbar';
import { useBlogs } from '../hooks';
import BlogSkeleton from '../components/BlogSkeleton';

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className='flex justify-center ml-96 pl-20 pt-4'>
          <div className='w-full'>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center max-w-xl'>
          {blogs.map((blog) => {
            const {
              id,
              title,
              content,
              author: { name },
            } = blog;

            return (
              <BlogCard
                key={id}
                authorName={name || 'Anonymous'}
                title={title}
                content={content}
                publishedDate='6th June 2024'
                id={id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
