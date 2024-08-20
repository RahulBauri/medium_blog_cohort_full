import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import SingleBlog from '../components/SingleBlog';
import Spinner from '../components/Spinner';
import Appbar from '../components/Appbar';

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || '' });

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className='flex justify-center items-center h-screen'>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* @ts-ignore */}
      <SingleBlog blog={blog} />
    </div>
  );
};

export default Blog;
