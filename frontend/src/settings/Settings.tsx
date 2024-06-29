import React, { useState } from "react";

export interface SettingsProps {
  toggleInterface: () => void;
}

export const Settings: React.FC<SettingsProps> = (prop: SettingsProps) => {
  const [settingTab, setSettingTab] = useState<string>("appearance");
  const [theme, setTheme] = useState<string>("default");
  const [font, setFont] = useState<string>("arial");
  const [fontSize, setFontSize] = useState<string>("16");
  const [spacing, setSpacing] = useState<string>("1.5");
  const [zoom, setZoom] = useState<string>("100");

  const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setFontSize(newValue);
    }
  };

  const handleSpacing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d+\.?\d*?$/.test(newValue)) {
      setSpacing(newValue);
    }
  };

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setZoom(newValue);
    }
  };

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
          <div className="flex flex-col w-[66%] overflow-auto">
            {settingTab === "appearance" && (
              <div className="flex flex-col">
                <div className="my-4 mx-8">
                  <label className="flex items-center text-2xl text-gray-100">
                    Theme:
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="ml-4 text-xl border-2 border-gray-100 bg-gray-600 p-2 rounded-xl"
                    >
                      <option value="default">Default</option>
                      <option value="monokailight">MonokaiLight</option>
                      <option value="theme42">Theme42</option>
                    </select>
                  </label>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl text-gray-100">
                      Font:
                      <select
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="ml-4 text-xl border-2 border-gray-100 bg-gray-600 p-2 rounded-xl"
                      >
                        <option value="arial">Arial</option>
                        <option value="opendys">OpenDys</option>
                        <option value="font42">Font42</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl text-gray-100">
                      Font size:
                      <input
                        type="text"
                        value={fontSize}
                        onChange={handleFontSize}
                        className="ml-4 text-xl border-2 border-gray-100 bg-gray-600 p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl text-gray-100">
                      Line spacing:
                      <input
                        type="text"
                        value={spacing}
                        onChange={handleSpacing}
                        className="ml-4 text-xl border-2 border-gray-100 bg-gray-600 p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl text-gray-100">
                      Zoom:
                      <input
                        type="text"
                        value={zoom}
                        onChange={handleZoom}
                        className="ml-4 text-xl border-2 border-gray-100 bg-gray-600 p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            {settingTab === "shortcuts" && (
              <div className="grid grid-cols-2 grid-rows-4 gap-4 text-xl my-4 mx-8">
                <div>
                  <b>Zoom-in:</b> Ctrl, +
                </div>
                <div>
                  <b>Zoom-out:</b> Ctrl, -
                </div>
                <div className="row-start-2">
                  <b>Run:</b> Ctrl, F5
                </div>
                <div className="row-start-2">
                  <b>Build:</b> Ctrl, F6
                </div>
                <div className="row-start-3">
                  <b>New file:</b> Ctrl, N
                </div>
                <div className="row-start-3">
                  <b>New folder:</b> Ctrl, D
                </div>
                <div className="row-start-4">
                  <b>Open settings:</b> Ctrl, Shift, S
                </div>
                <div className="row-start-4">
                  <b>Save:</b> Ctrl, S
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
