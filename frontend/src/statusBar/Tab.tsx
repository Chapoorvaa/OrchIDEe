import React from 'react';
import { useState } from 'react';

const Tab: React.FC = (string) => {
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState(string);

    function handleClick() {

    }

    function chooseLanguage() {

    }

    return (
        <div className={`flex h-[35px] min-w-[36px] bg-gray-800 text-gray-100 border-2 border-gray-600 ${isHovered ? 'brightness-125' : 'brightness-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <div className='flex justify-center items-center'>
                <img src={`${ handleClick() }`} alt="c++" className='ml-2 mr-2 h-[25px] w-[25px]' />
            </div>
            <div className='text-xl'>
                <p>${name}</p>
            </div>
            <div className='flex justify-center items-center'
                onClick={handleClick}
            >
                <img src="../cross.png" alt="cross" className={`ml-2 mr-2 h-[14px] w-[14px] hover:opacity-60 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            </div>
        </div>
    )
}

export default Tab;