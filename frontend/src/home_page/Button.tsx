export interface ButtonProps {
    label: string;
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ label, setHomepage }) => {
    const handleClick = () => {
        if (label === "new") {
            setHomepage(false);
        } else if (label === "open") {
        }
    };
    return (
        <button
            className="w-1/4 h-6/7 bg-gray-700 text-gray-100 ring-2 ring-gray-600 drop-shadow-lg rounded-full hover:bg-gray-600 hover:border-transparent focus:ring-gray-500"
            onClick={handleClick}
        >
            {label}
        </button>
    );
}

export default Button;
