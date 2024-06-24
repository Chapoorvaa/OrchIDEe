import Button from "./Button";
import CustomInput from "./CustomInput";

export interface OpenProjectProps {
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenProject: React.FC<OpenProjectProps> = ({ setHomepage }) => {
    return (
        <div className="flex flex-col justify-center m-auto drop-shadow-lg rounded-xl border-2 border-gray-600 bg-gray-800 h-1/2 w-3/4">
            <div className="flex flex-col">
                <CustomInput label="Project name" buttons={false} folder={false} setHomepage={setHomepage}/>
                <CustomInput label="Location" buttons={false} folder={true} setHomepage={setHomepage}/>
                <CustomInput label="Language" buttons={true} folder={false} setHomepage={setHomepage}/>
            </div>
            <div className="flex justify-around">
                <Button label="Cancel" setHomepage={setHomepage}/>
                <Button label="Create" setHomepage={setHomepage}/>
            </div>
        </div>
    );
}

export default OpenProject;
