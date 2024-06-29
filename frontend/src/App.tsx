import { BasePage } from "./BasePage";
import HomePage from "./home_page/HomePage";
import { useState } from "react";
import projectConfig from "../config.json";
import fs from "fs";

export interface ProjectDescProps {
  name: string;
  path: string;
  language: string;
}

function App() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  const [basepage, setBasePage] = useState(false);

  console.log(projectConfig.theme);
  console.log(projectConfig.font);
  console.log(projectConfig.fontSize);
  console.log(projectConfig.spacing);

  projectConfig.font = "opendys";

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
  };

  return (
    <div>
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
