export interface ButtonProps {
    label: string;
    setFunction: React.Dispatch<React.SetStateAction<any>>;
    projectName?: string;
    location?: FileList | null;
    language?: string;
}

const Button: React.FC<ButtonProps> = ({ label, setFunction, projectName, location, language }) => {
    const handleClick = () => {
        switch(label) {
            case "Cancel": {
                setFunction(true);
                break;
            }
            case "Create": {
                console.log(projectName);
                console.log(location);
                console.log(language);
                if (!projectName || !location || location.length === 0 || !language) {
                    setFunction(true);
                } else {
                    setFunction(false);
                    console.log("Creating project with:", { projectName, location, language });
                }
                break;
            }
            case "Java": {
                console.log("Language set to Java");
                setFunction("Java");
                break;
            }
            case "C++": {
                console.log("Language set to C++");
                setFunction("C++");
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
