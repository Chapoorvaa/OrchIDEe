import React from 'react';

export interface BottomBarProps {
  path: string
}

export const BottomBar : React.FC<BottomBarProps> = (prop: BottomBarProps) => {
  return (
    <div className='h-full w-full border-2 border-gray-600 bg-gray-800 flex items-center'>
      <div className='ml-2 text-lg'>
        {prop.path}
      </div>
    </div>
  );
}