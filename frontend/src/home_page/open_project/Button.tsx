export interface ButtonProps {
    label: string;
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ label, setHomepage }) => {
    const handleClick = () => {
        switch(label) {
            case "Cancel": {
                console.log("here");
                setHomepage(true);
                break;
            }
            case "Create": {
                break;
            }
            case "Java": {
                break;
            }
            case "C++": {
                break;
            }
        }
    };
    return (
        <button
            className="w-1/8 h-6/7 bg-transparent text-gray-100 ring-2 ring-gray-100 rounded-lg hover:bg-gray-600 hover:border-transparent focus:ring-gray-500"
            onClick={handleClick}
        >
            {label}
        </button>
    );
}

export default Button;
