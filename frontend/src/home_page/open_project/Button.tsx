import { Project, createProject } from "../api";

export interface ButtonProps {
  setBasePage: React.Dispatch<React.SetStateAction<boolean>>;
  isHighlighted?: boolean;
  label: string;
  setFunction: React.Dispatch<React.SetStateAction<any>>;
  projectName?: string;
  location?: string;
  language?: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const Button: React.FC<ButtonProps> = ({
  setBasePage,
  isHighlighted,
  label,
  setFunction,
  projectName,
  location,
  language,
  setName,
  setPath,
  setLanguage,
}) => {
  const handleClick = async () => {
    switch (label) {
      case "Cancel": {
        setFunction(true);
        break;
      }
      case "Create": {
        if (!projectName || !location || location.length === 0 || !language) {
          setFunction(true);
        } else {
          setFunction(false);
          console.log("Creating project with:", {
            projectName,
            location,
            language,
          });
          try {
            const fetching = await createProject(
              location,
              projectName,
              language
            );
            console.log("Sended the project!");
            setName(projectName);
            setPath(location + "/" + projectName);
            setLanguage(language);
            setBasePage(true);
          } catch (e) {
            console.log(e);
          }
        }
        break;
      }
      case "Browse": {
        const options = {
          title: "Open a directory",
          buttonLabel: "Select",
          properties: ["openDirectory"],
        };

        const { dialog } = require("@electron/remote");
        await dialog
          .showOpenDialog(options)
          .then(async (result: { filePaths: string }) => {
            var path = result.filePaths[0];
            console.log(path + " has been chosen!");
            setFunction(path);
          })
          .catch((err: any) => {
            console.log(err);
          });
        break;
      }
      case "Java": {
        console.log("Language set to Java");
        setFunction("java");
        isHighlighted = true;
        break;
      }
      case "C++": {
        console.log("Language set to C++");
        setFunction("cpp");
        isHighlighted = true;
        break;
      }
    }
  };

  return (
    <button
      className={`w-1/8 h-6/7 text-skin-text-primary ring-2
                ring-gray-100 rounded-lg hover:bg-skin-bg-light
                hover:border-transparent focus:ring-gray-500
                ${
                  isHighlighted
                    ? "bg-skin-bg-light text-skin-text-primary "
                    : "bg-transparent"
                }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
