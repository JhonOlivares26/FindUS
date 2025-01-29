import React from 'react';

const InputField = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-4 p-2 border border-gray-300 rounded w-full"
    />
  );
};

export default InputField;


