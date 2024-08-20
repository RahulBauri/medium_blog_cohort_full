import React, { ChangeEvent } from 'react';

interface LabelledInputType {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div className='flex flex-col justify-center mb-4'>
      <label className='font-medium'>{label}</label>
      <input
        className='px-2 py-4 w-full border border-solid border-slate-200 rounded '
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelledInput;
