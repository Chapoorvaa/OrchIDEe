import CenterCube from "./CenterCube";
import Header from "./Header";
import OpenProject from "./open_project/OpenProject";
import { useState } from "react";

interface HomePageProps {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const HomePage: React.FC<HomePageProps> = ({ setName, setPath, setLanguage }) => {
    const [homepage, setHomepage] = useState(true);
    return (
        <div className="flex flex-col justify-center w-screen h-screen bg-gray-700">
            <Header homepage={homepage}/>
            {homepage && <CenterCube setHomepage={setHomepage} setName={setName} setPath={setPath} setLanguage={setLanguage}/>}
            {!homepage && <OpenProject setHomepage={setHomepage}/>}
        </div>
    );
}

export default HomePage;
