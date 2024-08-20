import Avatar from './Avatar';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className='flex flex-col justify-center p-4 border-b border-slate-200 cursor-pointer hover:bg-gray-100'>
        <div className='flex items-center'>
          <Avatar authorName={authorName} />
          <div className='ml-2 flex items-center justify-center'>
            <div className='mr-2'>{authorName}</div>
            <div className='bg-slate-300 h-1 w-1 rounded-full'>
              <div></div>
            </div>
            <div className='font-thin ml-2'>{publishedDate}</div>
          </div>
        </div>
        <div className='font-bold text-3xl'>{title}</div>
        <div className='text-lg mt-2'>{content.slice(0, 100) + '...'}</div>
        <div className='font-thin mt-8'>{`${Math.ceil(
          content.length / 100
        )} minutes read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
