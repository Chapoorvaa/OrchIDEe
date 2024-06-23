import Logo from "./Logo";
import Button from "./Button";

interface CenterCubeProps {
  setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const CenterCube: React.FC<CenterCubeProps> = ({ setHomepage }) => {
    return (
        <div className="flex flex-col justify-center m-auto drop-shadow-lg rounded-xl border-2 border-gray-600 bg-gray-800 h-1/2 w-1/4">
            <Logo />
            <div className="flex justify-around">
                <Button label="new" setHomepage={setHomepage}/>
                <Button label="open" setHomepage={setHomepage}/>
            </div>
        </div>
    );
}

export default CenterCube;
