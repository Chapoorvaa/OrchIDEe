import React, { useState } from "react";

export interface SettingsProps {
  toggleInterface: () => void;
}

export const Settings: React.FC<SettingsProps> = (prop: SettingsProps) => {
  const [settingTab, setSettingTab] = useState<string>("appearance");

  return (
    <>
      <div className="fixed top-1/4 left-1/2 translate-x-[-50%] h-[50vh] w-[42vw] bg-gray-600 border-2 border-gray-600 overflow-hidden rounded-xl">
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
            <div
              className={
                `flex justify-center items-center text-lg py-2 border-gray-600 border-y-2` +
                (settingTab === "appearance" ? " bg-gray-600" : "")
              }
              onClick={() => setSettingTab("appearance")}
            >
              Appearance
            </div>
            <div
              className={
                `flex justify-center items-center text-lg py-2 border-gray-600 border-y-2` +
                (settingTab === "shortcuts" ? " bg-gray-600" : "")
              }
              onClick={() => setSettingTab("shortcuts")}
            >
              Shortcuts
            </div>
          </div>
          <div className="flex flex-col w-[66%]">
            {settingTab === "appearance" && <div>Appearance</div>}
            {settingTab === "shortcuts" && <div>Shortcuts</div>}
          </div>
        </div>
      </div>
    </>
  );
};
