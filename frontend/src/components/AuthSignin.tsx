import { SigninInput } from '@rahulbauri/medium-common';
import React, { useState } from 'react';
import LabelledInput from './LabelledInput';
import AuthHeader from './AuthHeader';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { BACKEND_URL_PRODUCTION } from '../config';
import { useNavigate, useNavigation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthSignin = ({ type }: { type: 'signup' | 'signin' }) => {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === 'submitting';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSigninRequest = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL_PRODUCTION}/user/login`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem('token', jwt);

      const res = await axios.get(`${BACKEND_URL_PRODUCTION}/blog/user`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const user = res.data.user;
      localStorage.setItem('loggedUserName', user.name);

      setIsSubmitting(false);

      navigate('/blogs');

      toast.success('user signed in successfully');
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <AuthHeader type={type} />
        <LabelledInput
          label='Email'
          placeholder='test@test.com'
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              email: e.target.value,
            });
          }}
          type='email'
        />
        <LabelledInput
          label='Password'
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
          type='password'
        />
        <SubmitButton
          type={type}
          onClick={sendSigninRequest}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AuthSignin;
