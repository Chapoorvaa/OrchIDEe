import Button from "./Button";

export interface CustomInputProps {
    label: string;
    buttons: boolean;
    folder: boolean;
    setHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, buttons, folder, setHomepage }) => {
    return (
        <label className="flex justify-evenly">
            {label}:
            <div className="relative">
            {!buttons && <input className="placeholder:italic
                            placeholder:text-slate-400 block bg-transparent w-2/1
                            border border-slate-300 rounded-md py-2 pl-9
                            shadow-sm focus:outline-none focus:border-gray-600
                            focus:ring-gray-600 focus:ring-1 sm:text-sm"
                         type="text"
                         name={label}/>}
            {folder && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <img src="../folder_icon.png" alt="folder" className="h-5 w-5 fill-slate-300"/>
                    </span>
            )}
            {buttons && (
                <div className="flex justify-evenly w-full">
                    <Button label="Java" setHomepage={setHomepage}/>
                    <Button label="C++" setHomepage={setHomepage}/>
                </div>
            )}
            </div>
        </label>
    );
}

export default CustomInput;
