import React from 'react';

interface RightBarProps {
  onShowBot: () => void;
}

const RightBar: React.FC<RightBarProps> = ({ onShowBot }) => {
  return (
    <div className='h-full border border-gray-600 bg-gray-800'>
      <div className='flex border border-gray-600'>
        <button 
          type='button' 
          onClick={onShowBot} 
          className='flex text-white font-semibold h-[15vh] w-full rounded-none bg-gray-800 p-0 hover:brightness-125 transition hover:border-gray-800'>
          <img src='../botButton.png' alt="Bot Button"/>
        </button>
      </div>
    </div>
  );
}

export default RightBar;