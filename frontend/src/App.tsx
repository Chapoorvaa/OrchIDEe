import { BasePage } from './BasePage'
import HomePage from "./home_page/HomePage";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [language, setLanguage] = useState("");
  return (
    <div>
        { path === "" && <HomePage setName={setName} setPath={setPath} setLanguage={setLanguage}/> }
        { path !== "" && <BasePage /> }
    </div>
  );
}

export default App
