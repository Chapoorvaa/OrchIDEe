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
        <div className="flex flex-col justify-center text-center m-auto drop-shadow-lg rounded-xl border-2 border-skin-stroke-light bg-skin-bg-dark h-1/2 w-1/4">
            <Logo />
            <div className="flex justify-around">
                <Button label="new" setBasePage={setBasePage} setFunction={setHomepage}/>
                <Button setBasePage={setBasePage} label="open" setName={setName} setPath={setPath} setLanguage={setLanguage}/>
            </div>
        </div>
    );
}

export default CenterCube;
