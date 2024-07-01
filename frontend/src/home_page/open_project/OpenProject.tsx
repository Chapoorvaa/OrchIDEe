import Button from "./Button";
import { useState } from "react";

export interface OpenProjectProps {
  setBasePage: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  path: string;
  language: string;
  setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const OpenProject: React.FC<OpenProjectProps> = ({
  setBasePage,
  projectName,
  path,
  language,
  setHomepage,
  setProjectName,
  setPath,
  setLanguage,
}) => {
  const [error, setError] = useState(false);

  return (
    <div className="flex flex-col justify-center m-auto drop-shadow-lg rounded-xl border-2 border-skin-stroke-light bg-skin-bg-dark text-skin-text-primary">
      <div className="grid grid-cols-3 m-5 grid-rows-3 gap-3 h-70">
        <label className="row-start-1 flex justify-evenly">Project name:</label>
        <input
          className="col-span-2 placeholder:italic
                                placeholder:text-slate-400 block bg-transparent w-2/1
                                border border-slate-300 rounded-md py-2 pl-9
                                shadow-sm focus:outline-none focus:border-skin-stroke-light
                                focus:ring-gray-600 focus:ring-1 sm:text-sm overflox-x-auto"
          type="text"
          name="project-name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <label
          className="row-start-2 flex justify-evenly"
          htmlFor="location-input"
        >
          Location:
        </label>
        <div className="col-span-2 row-start-2 flex items-center">
          <Button label="Browse" setFunction={setPath} />
          {path && (
            <div className="flex items-center ml-2 text-skin-text-secondary overflow-x-scroll no-scrollbar text-nowrap w-72">
              {path}
            </div>
          )}
        </div>

        <label className="row-start-3 flex justify-evenly">Language:</label>
        <div className="col-span-3 row-start-3 flex items-center justify-evenly">
          <Button
            label="Java"
            setFunction={setLanguage}
            isHighlighted={language === "java"}
          />
          <Button
            label="C++"
            setFunction={setLanguage}
            isHighlighted={language === "cpp"}
          />
        </div>

        {error && (
          <p className="row-start-4 col-start-2 col-span-3 text-red-500">
            One or more property is not specified
          </p>
        )}
      </div>

      <div className="m-5 flex justify-between">
        <Button label="Cancel" setFunction={setHomepage} />
        <Button
          label="Create"
          setFunction={setError}
          setBasePage={setBasePage}
          language={language}
          projectName={projectName}
          location={path}
          setName={setProjectName}
          setPath={setPath}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
};

export default OpenProject;
