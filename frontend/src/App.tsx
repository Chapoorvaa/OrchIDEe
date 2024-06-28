import { BasePage } from './BasePage'
import HomePage from "./home_page/HomePage";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  const [basepage, setBasePage] = useState(false);
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
        { basepage && <BasePage /> }
    </div>
  );
}

export default App
