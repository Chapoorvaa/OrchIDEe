import Logo from "./Logo";
import Button from "./Button";
import { useState } from "react";

interface CenterCubeProps {
  setBasePage: React.Dispatch<React.SetStateAction<boolean>>;
  setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const CenterCube: React.FC<CenterCubeProps> = ({ setBasePage, setHomepage, setName, setPath, setLanguage }) => {
    const [error, setError] = useState(false);
    return (
        <div className="flex flex-col justify-center text-center m-auto drop-shadow-lg rounded-xl border-2 border-gray-600 bg-gray-800 h-1/2 w-1/4">
            <Logo />
            { error && <p className="text-red-500">The directory selected is not a project</p> }
            <div className="flex justify-around">
                <Button label="new" setBasePage={setBasePage} setFunction={setHomepage}/>
                <Button label="open" setFunction={setError} setName={setName} setPath={setPath} setLanguage={setLanguage}/>
            </div>
        </div>
    );
}

export default CenterCube;
