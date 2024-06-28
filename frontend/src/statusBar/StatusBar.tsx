import React from 'react';

const StatusBar: React.FC = () => {
    return (
        <div className="flex h-full w-full bg-gray-800 text-gray-100 border-2 border-gray-600 justify-between pr-[50px] pl-[150px]">
            <div className='border-2 border-gray-600 w-[1500px]'>
                coucou
            </div>
            <div className='flex justify-end'>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../save.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../settings.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../play.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../build.png" className='w-6 h-6' />
                </div>
            </div>
        </div>
    );
}

export default StatusBar;