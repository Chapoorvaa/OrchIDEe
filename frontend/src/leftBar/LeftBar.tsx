import React from 'react';

interface LeftBarProps {
  onShowFileTree: () => void;
  onShowGitInterface: () => void;
}

const LeftBar: React.FC<LeftBarProps> = ({ onShowFileTree, onShowGitInterface }) => {
  return (
    <div className='h-full border border-gray-600 bg-gray-800'>
      <div className='flex border border-gray-600'>
        <button 
          type='button' 
          onClick={onShowFileTree} 
          className='flex text-white font-semibold h-[14vh] w-full rounded-none bg-gray-800 p-0 hover:brightness-125 transition hover:border-gray-800'>
          <img src='../projectButton.png' alt="Project Button"/>
        </button>
      </div>
      <div className='flex border border-gray-600'>
        <button 
          type='button' 
          onClick={onShowGitInterface} 
          className='flex text-white font-semibold h-[10vh] w-full rounded-none bg-gray-800 p-0 hover:brightness-125 transition hover:border-gray-800'>
          <img src='../gitButton.png' alt="Git Button"/>
        </button>
      </div>
    </div>
  );
}

export default LeftBar;