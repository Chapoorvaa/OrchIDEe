import { useRef } from 'react';

export interface ButtonProps {
    label: string;
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ label, setHomepage }) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (label === "new") {
            setHomepage(false);
        } else if (label === "open") {
            fileInput.current.click();
        }
    };
    return (
        <button
            className="w-1/4 h-6/7 bg-gray-700 text-gray-100 ring-2 ring-gray-600 drop-shadow-lg rounded-full hover:bg-gray-600 hover:border-transparent focus:ring-gray-500"
            onClick={handleClick}
        >
            {label}
        <input type="file" ref={fileInput} className="sr-only" webkitdirectory="true" />
        </button>
    );
}

export default Button;
