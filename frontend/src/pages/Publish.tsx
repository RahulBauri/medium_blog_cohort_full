import React, { useEffect, useState } from 'react';
import LabelledInput from '../components/LabelledInput';
import Appbar from '../components/Appbar';
import { BACKEND_URL_PRODUCTION } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const Publish = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first to publish');
      return;
    }
  }, []);

  const publishBlog = async () => {
    setIsSubmitting(true);
    try {
      if (title === '' || content === '') {
        throw new Error('Title or content of the blog can not be empty');
      }

      const response = await axios.post(
        `${BACKEND_URL_PRODUCTION}/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      setIsSubmitting(false);
      navigate(`/blog/${response.data.id}`);
      toast.success('blog published successfully!');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || error.message);
      // toast.error(error?.response?.data?.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className='flex justify-center items-center border border-green-500 h-screen'>
        <div className='w-6/12 -mt-64'>
          <LabelledInput
            label=''
            placeholder='Title of your blog'
            onChange={(e) => setTitle(e.target.value)}
            type='text'
          />

          <div className='flex justify-center'>
            <textarea
              value={content}
              placeholder='content of your blog'
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              cols={80}
              className='p-4 border border-slate-400'
            />
          </div>
          <div className='flex justify-center'>
            <div className='mt-4 cursor-pointer bg-green-500 rounded-2xl w-24 py-1 hover:bg-green-400 text-center flex justify-center items-center'>
              <button disabled={isSubmitting} onClick={publishBlog}>
                {isSubmitting ? <Spinner /> : 'publish'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
