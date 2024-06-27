import React, { useState, useEffect } from 'react';
import './LeftRod.css';

const LeftRod: React.FC = () => {
    return (
        <div className='h-full border border-gray-600 bg-gray-800'>
            <div className='flex border border-gray-600'>
                <button type='button' className='buttoncss flex text-white font-semibold h-[15vh] w-full rounded-none bg-gray-800 p-0'>
                    <div className='flex -rotate-90'>
                        <img src='../ProjectRod'/>
                    </div>
                </button>
            </div>
            <div className='flex border border-gray-600'>
                <button type='button' className='flex text-white font-semibold h-[15vh] w-full rounded-none bg-gray-800'><img src='../folder.png'/>Coucou</button>
            </div>
        </div>
    )
}

export default LeftRod;