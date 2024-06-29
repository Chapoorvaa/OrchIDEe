import React from "react";
import { Config } from "../codeEditor/CodeEditor";
import Tab from "./Tab";
import { fetchRunResponse } from "../terminal/TerminalService";
import { ProjectDescProps } from "../App";
import { File } from "../codeEditor/CodeEditor";
import { SettingsProps } from "../settings/Settings";

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

  return (
    <div className="flex h-full w-full bg-gray-800 text-gray-100 border-2 border-gray-600 justify-between">
      <div className="mr-[50px] ml-[46px]">
        <div className="flex align-center">
          {prop.opened && prop.opened.length > 0 ? (
            prop.opened.map((content) => (
              <div
                className="p-0 m-0 bg-gray-800 h-[48px]"
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
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]">
          <img src="../save.png" className="w-6 h-6" />
        </div>
        <div className="flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]"
          onClick={ () => prop.onShowSettings(true) }
        >
          <img src="../settings.png" className="w-6 h-6" />
        </div>
        <div
          className="flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]"
          onClick={handleRun}
        >
          <img src="../play.png" className="w-6 h-6" />
        </div>
        <div className="flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]">
          <img src="../build.png" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
