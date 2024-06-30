import React from "react";
import { Config } from "../codeEditor/CodeEditor";
import Tab from "./Tab";
import { fetchRunResponse } from "../terminal/TerminalService";
import { ProjectDescProps } from "../App";
import { File } from "../codeEditor/CodeEditor";
import { SettingsProps } from "../settings/Settings";
import { fetchSaveResponse } from "../save/saveService";

export interface StatusBarProps {
  opened: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOpenedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  playFunction: React.Dispatch<React.SetStateAction<boolean>>;
  Projectname: string;
  ProjectLanguage: string;
  setTerminalContent: React.Dispatch<React.SetStateAction<string>>;
  settingsProp: SettingsProps;
  onShowSettings: (arg: boolean) => void;
  theme: string;
}

const StatusBar: React.FC<StatusBarProps> = (prop: StatusBarProps) => {
  const handleChangePage = (index: number) => {
    prop.setCurrentPage(index);
  };

  const handleRun = async () => {
    prop.setTerminalContent("Running project...");
    prop.playFunction(true);

    try {
      const response = await fetchRunResponse(
        prop.Projectname,
        prop.ProjectLanguage
      );
      prop.setTerminalContent("Output: " + response);
    } catch (error) {
      prop.setTerminalContent(
        "An error occured when building or running the project"
      );
    }
  };

  const handleSave = async () => {
    try {
      fetchSaveResponse(
        prop.opened[prop.currentPage].path,
        prop.opened[prop.currentPage].content
      );
    } catch (error) {
      console.log("oups");
    }
  };

  return (
    <div className="flex h-full w-full bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light justify-between">
      <div className="mr-[50px] ml-[46px]">
        <div className="flex align-center">
          {prop.opened && prop.opened.length > 0 ? (
            prop.opened.map((content) => (
              <div
                className="p-0 m-0 bg-skin-bg-dark h-[48px]"
                key={prop.opened.indexOf(content)}
                onClick={() => handleChangePage(prop.opened.indexOf(content))}
              >
                <Tab
                  path={content.path}
                  tabIndex={prop.opened.indexOf(content)}
                  opened={prop.opened}
                  currentPage={prop.currentPage}
                  setOpenedFiles={prop.setOpenedFiles}
                  setCurrentPage={prop.setCurrentPage}
                  theme={prop.theme}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]"
          onClick={handleSave}
        >
          <img
            src={prop.theme === "Light" ? "../savewhite.png" : "../save.png"}
            className="w-6 h-6"
          />
        </div>
        <div
          className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]"
          onClick={() => prop.onShowSettings(true)}
        >
          <img
            src={
              prop.theme === "Light"
                ? "../settingswhite.png"
                : "../settings.png"
            }
            className="w-6 h-6"
          />
        </div>
        <div
          className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]"
          onClick={handleRun}
        >
          <img
            src={prop.theme === "Light" ? "../playwhite.png" : "../play.png"}
            className="w-6 h-6"
          />
        </div>
        <div className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]">
          <img
            src={prop.theme === "Light" ? "../buildwhite.png" : "../build.png"}
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
