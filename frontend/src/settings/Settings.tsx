import React from "react";

export interface SettingsProps {
  toggleInterface: () => void;
}

export const Settings: React.FC<SettingsProps> = (prop: SettingsProps) => {
  return (
    <>
      <div className="fixed top-1/4 left-1/2 translate-x-[-50%] h-[50vh] w-[50vw] bg-gray-600 border-2 border-gray-600 overflow-hidden">
        <div className="flex flex-nowrap items-center h-[50px] bg-gray-800">
          <div className="flex items-center justify-center grow h-full text-xl">
            Settings
          </div>
          <img
            className="h-[20px] w-[20px] mr-4"
            onClick={prop.toggleInterface}
            src="../cross.png"
          />
        </div>
        <div className="flex h-full border-gray-600 border-b-2">
          <div className="flex flex-col bg-gray-800 w-[33%]">
            <div>Appearance</div>
            <div>Shortcuts</div>
          </div>
          <div className="flex flex-col w-[66%]">
            
          </div>
        </div>
      </div>
    </>
  );
};
