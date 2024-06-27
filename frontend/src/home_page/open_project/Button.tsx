import { Project, createProject  } from '../api';

export interface ButtonProps {
    label: string;
    setFunction: React.Dispatch<React.SetStateAction<any>>;
    projectName?: string;
    location?: string;
    language?: string;
}

const Button: React.FC<ButtonProps> = ({ label, setFunction, projectName, location, language }) => {

    const handleClick = async () => {
        switch(label) {
            case "Cancel": {
                setFunction(true);
                break;
            }
            case "Create": {
                if (!projectName || !location || location.length === 0 || !language) {
                    setFunction(true);
                } else {
                    setFunction(false);
                    console.log("Creating project with:", { projectName, location, language });
                    try {
                        const fetching = await createProject(location, projectName, language);
                        console.log("Sended the project!");
                    } catch (e) {
                        console.log(e);
                    }
                }
                break;
            }
            case "Browse": {
                const options = {
                    title: 'Open a directory',
                    buttonLabel: 'Select',
                    properties: ['openDirectory']
                };

                const {dialog} = require("@electron/remote");
                await dialog.showOpenDialog(options)
                .then(async (result: { filePaths: string; }) => {
                    var path = result.filePaths[0];
                    console.log(path + " a ete choisit !");
                    setFunction(path);
                }).catch((err: any) => {
                    console.log(err)
                })
                break;
            }
            case "Java": {
                console.log("Language set to Java");
                setFunction("JAVA");
                break;
            }
            case "C++": {
                console.log("Language set to C++");
                setFunction("CPP");
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
