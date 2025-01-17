import { useRef } from "react";
import { Project, sendProject } from "./api";
import { dialog } from "@electron/remote";

export interface ButtonProps {
  setBasePage: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  setFunction: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Button: React.FC<ButtonProps> = ({
  setBasePage,
  label,
  setFunction,
  setName,
  setPath,
  setLanguage,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = async () => {
    if (label === "new") {
      setFunction(false);
    } else if (label === "open") {
      const options = {
        title: "Select a project",
        buttonLabel: "Select",
        properties: ["openDirectory"],
      };

      await dialog
        .showOpenDialog(options)
        .then(async (result: { filePaths: string }) => {
          var path = result.filePaths[0];
          if (!path) {
            console.log("No folder has been selected")
            return;
          }
          console.log(path + " has been chosen !");

          setPath(path);

          const fs = require("fs");
          if (fs.existsSync(`${path}/pom.xml`)) {
            console.log("Language: Java");
            setLanguage("JAVA");
          } else if (fs.existsSync(`${path}/Makefile`)) {
            console.log("Language: C++");
            setLanguage("CPP");
          } else {
            console.log("Language is UNKNOWN");
            setLanguage("UNKNOWN");
          }

          var dirs = path.split("/");
          var name = dirs[dirs.length - 1];
          setName(name);

          console.log("Opening project with:", { name, path });

          try {
            const fetching = await sendProject(path);
            console.log("Sent the project!");
            setBasePage(true);
          } catch (e) {
            console.log(e);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <button
      className="w-1/4 h-6/7 bg-skin-bg-medium text-skin-text-primary ring-2 ring-gray-600 drop-shadow-lg rounded-full hover:bg-skin-bg-light hover:border-transparent focus:ring-gray-500"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
