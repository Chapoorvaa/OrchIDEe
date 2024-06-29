import React, { useState, useEffect } from 'react';
import { StatusBarProps } from './StatusBar';

const Tab: React.FC<StatusBarProps> = (props: StatusBarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("unknown");

    useEffect(() => {
        const name = props.path.substring(props.path.lastIndexOf('/') + 1);
        const extension = name.split('.').pop();

        if (extension === "java") {
            setLanguage("./java.png");
        } else if (extension === "cc") {
            setLanguage("./cpp.png");
        } else {
            setLanguage("unknown");
        }
    }, [props.path]);

    function handleClick() {
        // handle click functionality
    }

    return (
        <div
            className={`flex h-[35px] min-w-[36px] bg-gray-800 text-gray-100 border-2 border-gray-600 ${isHovered ? 'brightness-125' : 'brightness-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex justify-center items-center'>
                <img src={language} alt={language} className='ml-2 mr-2 h-[25px] w-[25px]' />
            </div>
            <div className='text-xl'>
                <p>{props.path.substring(props.path.lastIndexOf('/') + 1)}</p>
            </div>
            <div
                className='flex justify-center items-center'
                onClick={handleClick}
            >
                <img
                    src="../cross.png"
                    alt="cross"
                    className={`ml-2 mr-2 h-[14px] w-[14px] hover:opacity-60 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
}

export default Tab;
