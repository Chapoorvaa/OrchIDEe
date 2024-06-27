import { useRef } from 'react';

export interface ButtonProps {
    label: string;
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPath: React.Dispatch<React.SetStateAction<string>>;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Button: React.FC<ButtonProps> = ({ label, setHomepage, setName, setPath, setLanguage }) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        if (label === "new") {
            setHomepage(false);
        } else if (label === "open") {
            const options = {
                title: 'Open a directory',
                buttonLabel: 'Select',
                properties: ['openDirectory']
            };

            const {dialog} = require("@electron/remote");
            await dialog.showOpenDialog(options).
            then(async (result: { filePaths: string; }) => {
                var path = result.filePaths[0];
                console.log(path + " a ete choisit !");
                setPath(path);

                const fs = require("fs");
                if (fs.existsSync(`${path}/pom.xml`)) {
                    console.log("Language: Java");
                    setLanguage("Java");
                } else {
                    console.log("Language: C++");
                    setLanguage("C++");
                }

                var dirs = path.split("/");
                var name = dirs[dirs.length - 1];
                setName(name);

                console.log("Creating project with:", { name, path });
            }).catch((err: any) => {
                console.log(err)
            })

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
