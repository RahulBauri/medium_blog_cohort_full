import React from 'react';

const Quote = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-gray-200 h-screen p-16'>
      <div className='max-w-md text-3xl font-bold'>
        "The customer service I received was exceptional. The support team went
        above and beyond to address my concerns."
      </div>
      <div className='self-start'>
        <div className='text-xl font-semibold mt-4'>Jules Winnfield</div>
        <div className='text-sm font-light text-slate-400'>CEO, Acme inc</div>
      </div>
    </div>
  );
};

export default Quote;
