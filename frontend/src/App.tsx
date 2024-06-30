import { BasePage } from "./BasePage";
import HomePage from "./home_page/HomePage";
import { useState } from "react";
import projectConfig from "../config.json";
import fs from "fs";

export interface ProjectDescProps {
  name: string;
  path: string;
  language: string;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  fontSize: number;
}

function App() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  const [basepage, setBasePage] = useState(false);
  const [theme, setTheme] = useState(projectConfig.theme);

  console.log(projectConfig.theme);
  console.log(projectConfig.font);
  console.log(projectConfig.fontSize);
  console.log(projectConfig.spacing);

  fs.writeFile("config.json", JSON.stringify(projectConfig, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Configuration saved successfully");
    }
  });

  const desc: ProjectDescProps = {
    name,
    path,
    language,
    theme: projectConfig.theme,
    setTheme: setTheme,
    font: projectConfig.font,
    fontSize: projectConfig.fontSize,
  };

  return (
    <div className={[projectConfig.theme, projectConfig.font].join(" ")}>
      {!basepage && (
        <HomePage
          projectName={name}
          path={path}
          language={language}
          setName={setName}
          setPath={setPath}
          setLanguage={setLanguage}
          setBasePage={setBasePage}
        />
      )}
      {basepage && <BasePage {...desc} />}
    </div>
  );
}

export default App;
