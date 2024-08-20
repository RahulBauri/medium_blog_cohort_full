import React from 'react';

const Avatar = ({
  authorName,
  size,
}: {
  authorName: string;
  size?: string;
}) => {
  return (
    <div
      className={`bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100`}
    >
      <div>{authorName?.[0] || 'X'}</div>
    </div>
  );
};

export default Avatar;
