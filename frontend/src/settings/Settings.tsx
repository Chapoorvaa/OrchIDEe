import React, { useEffect, useState } from "react";
import { webFrame } from "electron";

export interface SettingsProps {
  toggleInterface: () => void;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  spacing: number;
  setSpacing: React.Dispatch<React.SetStateAction<number>>;
}

export const Settings: React.FC<SettingsProps> = (prop: SettingsProps) => {
  const [settingTab, setSettingTab] = useState<string>("appearance");
  const [theme, setTheme] = useState<string>(prop.theme);
  const [font, setFont] = useState<string>(prop.font);
  const [fontSize, setFontSize] = useState<string>("" + prop.fontSize);
  const [spacing, setSpacing] = useState<string>("" + prop.spacing);
  const [zoom, setZoom] = useState<string>(
    "" + (webFrame.getZoomLevel() * 10 + 100)
  );

  const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      prop.setFontSize(Number(newValue));
      setFontSize(newValue);
    }
  };

  const handleSpacing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*\.?\d*?$/.test(newValue)) {
      prop.setSpacing(Number(newValue));
      setSpacing(newValue);
    }
  };

  const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*\.?\d*?$/.test(newValue)) {
      webFrame.setZoomLevel((Number(newValue) - 100) / 10);
      setZoom(newValue);
    }
  };

  return (
    <>
      <div className="font-custom fixed top-1/4 left-1/2 translate-x-[-50%] h-[50vh] w-[50vw] bg-skin-bg-light border-2 border-skin-stroke-light rounded-xl">
        <div className="flex flex-nowrap items-center h-[50px] bg-skin-bg-dark">
          <div className="flex items-center justify-center grow h-full text-xl text-skin-text-primary">
            Settings
          </div>
          <img
            className="cursor-pointer h-[20px] w-[20px] mr-4"
            onClick={prop.toggleInterface}
            src={prop.theme == "Light" ? "../crosswhite.png" : "../cross.png"}
          />
        </div>
        <div className="flex h-[calc(50vh-50px)] border-skin-stroke-light border-b-2">
          <div className="flex flex-col bg-skin-bg-dark w-[33%]">
            <div
              className={
                `cursor-pointer flex justify-center items-center text-lg py-2 border-skin-stroke-light border-y-2` +
                (settingTab === "appearance"
                  ? " bg-skin-bg-light"
                  : " text-skin-text-primary")
              }
              onClick={() => setSettingTab("appearance")}
            >
              Appearance
            </div>
            <div
              className={
                `cursor-pointer flex justify-center items-center text-lg py-2 border-skin-stroke-light border-y-2` +
                (settingTab === "shortcuts"
                  ? " bg-skin-bg-light"
                  : " text-skin-text-primary")
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
                  <label className="flex items-center text-2xl ">
                    Theme:
                    <select
                      value={theme}
                      onChange={(e) => {
                        prop.setTheme(e.target.value);
                        setTheme(e.target.value);
                      }}
                      className="ml-4 text-xl border-2 border-skin-stroke-light bg-skin-bg-light p-2 rounded-xl"
                    >
                      <option value="Default">Default</option>
                      <option value="Monokai">Monokai</option>
                      <option value="Light">Light</option>
                    </select>
                  </label>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl">
                      Font:
                      <select
                        value={font}
                        onChange={(e) => {
                          prop.setFont(e.target.value);
                          setFont(e.target.value);
                        }}
                        className="ml-4 text-xl border-2 border-skin-stroke-light bg-skin-bg-light p-2 rounded-xl"
                      >
                        <option value="Arial">Arial</option>
                        <option value="OpenDys">OpenDys</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Courier">Courier</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl">
                      Font size:
                      <input
                        type="text"
                        value={fontSize}
                        onChange={handleFontSize}
                        className="ml-4 text-xl border-2 border-skin-stroke-light bg-skin-bg-light p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl">
                      Line spacing:
                      <input
                        type="text"
                        value={spacing}
                        onChange={handleSpacing}
                        className="ml-4 text-xl border-2 border-skin-stroke-light bg-skin-bg-light p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 ml-8">
                    <label className="flex items-center text-2xl ">
                      Zoom:
                      <input
                        type="text"
                        value={zoom}
                        onChange={handleZoom}
                        className="ml-4 text-xl border-2 border-skin-stroke-light bg-skin-bg-light p-2 rounded-xl"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            {settingTab === "shortcuts" && (
              <div className="grid grid-cols-2 grid-rows-5 gap-4 text-xl my-4 mx-8">
                <div>
                  <b>Zoom-in:</b> Ctrl, +
                </div>
                <div>
                  <b>Zoom-out:</b> Ctrl, -
                </div>
                <div className="row-start-2">
                  <b>Reset zoom:</b> Ctrl, 0
                </div>
                <div className="row-start-2">
                  <b>Run:</b> Ctrl, F5
                </div>
                <div className="row-start-3">
                  <b>Build:</b> Ctrl, F6
                </div>
                <div className="row-start-3">
                  <b>New file:</b> Ctrl, N
                </div>
                <div className="row-start-4">
                  <b>New folder:</b> Ctrl, D
                </div>
                <div className="row-start-4">
                  <b>Open settings:</b> Ctrl, Shift, S
                </div>
                <div className="row-start-5">
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
