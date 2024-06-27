import Button from "./Button";
import { useState } from "react";

export interface OpenProjectProps {
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenProject: React.FC<OpenProjectProps> = ({ setHomepage }) => {
    const [language, setLanguage] = useState("");
    const [error, setError] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [path, setPath] = useState("");

    return (
        <div className="flex flex-col justify-center m-auto drop-shadow-lg rounded-xl border-2 border-gray-600 bg-gray-800 h-1/3 w-2/5">
            <div className="grid grid-cols-4 m-5 grid-rows-3 gap-3 h-50">

                <label className="row-start-1 flex justify-evenly">Project name:</label>
                <input className="col-span-3 placeholder:italic
                                placeholder:text-slate-400 block bg-transparent w-2/1
                                border border-slate-300 rounded-md py-2 pl-9
                                shadow-sm focus:outline-none focus:border-gray-600
                                focus:ring-gray-600 focus:ring-1 sm:text-sm"
                    type="text"
                    name="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />

                <label className="row-start-2 flex justify-evenly" htmlFor="location-input">Location:</label>
                <Button label="Browse" setFunction={setPath}/>

                <label className="row-start-3 flex justify-evenly">Language:</label>
                <div className="col-span-3 row-start-3 flex justify-evenly w-full">
                    <Button label="Java" setFunction={setLanguage}/>
                    <Button label="C++" setFunction={setLanguage}/>
                </div>

                { error && <p className="row-start-4 col-start-2 col-span-3 text-red-500">One or more property is not specified</p> }
            </div>

            <div className="m-5 flex justify-between">
                <Button label="Cancel" setFunction={setHomepage}/>
                <Button label="Create" setFunction={setError}
                    language={language}
                    projectName={projectName}
                    location={path}
                />
            </div>
        </div>
    );
}

export default OpenProject;
