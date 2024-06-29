import React, { useState, useEffect } from 'react';
import { StatusBarProps } from './StatusBar';

const Tab: React.FC<StatusBarProps> = (props: StatusBarProps) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("unknown");

    useEffect(() => {
        if (props.path) {
            const name = props.path.substring(props.path.lastIndexOf('/') + 1);
            const extension = name.split('.').pop();

            if (extension === "java") {
                setLanguage("./java.png");
            } else if (extension === "cc") {
                setLanguage("./cpp.png");
            } else {
                setLanguage("unknown");
            }
        }
    }, [props.path]);

    function handleClick() {
        if (props.config && props.keyy !== undefined) {
            props.config.setOpenedFiles(props.config.opened.slice(props.keyy, props.keyy + 1));
            console.log("opened : ", props.config.opened);
            console.log("currentPage : ", props.config.currentPage);
            console.log("key : ", props.keyy);

            if (props.keyy === props.config.currentPage) {
                props.config.setCurrentPage(0); 
            }
        } else {
            console.warn("Config or keyy is undefined");
        }
    }

    return (
        <div 
            className={`flex h-[48px] min-w-[36px] bg-gray-800 text-gray-100 border-2 border-gray-600 ${isHovered ? 'brightness-125' : 'brightness-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex justify-center items-center'>
                <img src={language} alt={language} className='ml-2 mr-2 h-[25px] w-[25px]' />
            </div>
            <div className='text-xl'>
                <p>{props.path ? props.path.substring(props.path.lastIndexOf('/') + 1) : 'Unknown'}</p>
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