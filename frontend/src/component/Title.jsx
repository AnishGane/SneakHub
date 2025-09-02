import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-3 inline-flex items-center gap-2">
      <p className="text-gray-600">
        {text1}{' '}
        <span className="rounded-[4px] bg-black px-2 py-1 font-medium text-white">{text2}</span>
      </p>
    </div>
  );
};

export default Title;
