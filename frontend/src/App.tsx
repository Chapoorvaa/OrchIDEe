import { BasePage } from './BasePage'
import HomePage from "./home_page/HomePage";
import { useState } from "react";

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

  const desc: ProjectDescProps = {
    name,
    path,
    language
  };

  return (
    <div>
        { !basepage && <HomePage
            projectName={name}
            path={path}
            language={language}
            setName={setName}
            setPath={setPath}
            setLanguage={setLanguage}
            setBasePage={setBasePage}/> }
        { basepage && <BasePage {...desc} />}
    </div>
  );
}

export default App