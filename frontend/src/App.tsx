import { BasePage } from "./BasePage";
import HomePage from "./home_page/HomePage";
import { useEffect, useState } from "react";
import projectConfig from "../config.json";
import fs from "fs";

export interface ProjectDescProps {
  name: string;
  path: string;
  language: string;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  spacing: number;
  setSpacing: React.Dispatch<React.SetStateAction<number>>;
}

function App() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  const [basepage, setBasePage] = useState(false);
  const [theme, setTheme] = useState(projectConfig.theme);
  const [font, setFont] = useState(projectConfig.font);
  const [fontSize, setFontSize] = useState(projectConfig.fontSize);
  const [spacing, setSpacing] = useState(projectConfig.spacing);

  const desc: ProjectDescProps = {
    name,
    path,
    language,
    theme: theme,
    setTheme: setTheme,
    font: font,
    setFont: setFont,
    fontSize: fontSize,
    setFontSize: setFontSize,
    spacing: spacing,
    setSpacing: setSpacing,
  };

  useEffect(() => {
    projectConfig.font = font;
    projectConfig.theme = theme;
    projectConfig.fontSize = fontSize;
    projectConfig.spacing = spacing;

    fs.writeFile(
      "config.json",
      JSON.stringify(projectConfig, null, 2),
      (err) => {
        if (err) {
          console.log("Error writing to file", err);
        } else {
          console.log("Configuration saved succesfully");
        }
      }
    );
  }, [theme, font, spacing, fontSize]);

  return (
    <div className={[theme, font].join(" ")}>
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
