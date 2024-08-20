import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL_PRODUCTION } from '../config';
import toast from 'react-hot-toast';

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL_PRODUCTION}/blog/bulk`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );

        setBlogs(response.data.posts);
        setLoading(false);
      } catch (error: any) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    };
    getAllBlogs();
  }, []);

  return { loading, blogs };
};

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const getBlog = async (id: string) => {
      try {
        const response = await axios.get(
          `${BACKEND_URL_PRODUCTION}/blog/${id}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
        setBlog(response.data.post);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.response.data.msg);
      }
    };
    getBlog(id);
  }, [id]);

  return { loading, blog };
};
