import React, { useState } from 'react';
import LabelledInput from './LabelledInput';
import { SignupInput } from '@rahulbauri/medium-common';
import AuthHeader from './AuthHeader';
import SubmitButton from './SubmitButton';
import axios from 'axios';
import { BACKEND_URL_PRODUCTION } from '../config';
import { useNavigate, useNavigation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthSignup = ({ type }: { type: 'signup' | 'signin' }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === 'submitting';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSignupRequest = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL_PRODUCTION}/user/signup`,
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

      toast.success('user signed up successfully');
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
          label='Name'
          placeholder='Enter your name'
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            });
          }}
          type='text'
        />
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
          onClick={sendSignupRequest}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AuthSignup;
