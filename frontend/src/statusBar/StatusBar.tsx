import React from "react";
import { Config } from "../codeEditor/CodeEditor";
import Tab from "./Tab";
import { fetchRunResponse } from "../terminal/TerminalService";
import { ProjectDescProps } from "../App";

export interface StatusBarProps {
  path: string;
  config: Config;
  keyy: number;
}

const StatusBar: React.FC<
  Config & {
    desc: ProjectDescProps;
    playFunction: (arg: boolean) => void;
    setTerminalContent: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ desc, playFunction, setTerminalContent, ...props }) => {
  const handleChangePage = (index: number) => {
    props.setCurrentPage(index);
  };

  const handleRun = async () => {
    setTerminalContent("Running project...");
    playFunction(true);

    try {
      const response = await fetchRunResponse(desc.name, desc.language);
      setTerminalContent("Output: " + response);
    } catch (error) {
      setTerminalContent(
        "An error occured when building or running the project"
      );
    }
  };

  return (
    <div className="flex h-full w-full bg-gray-800 text-gray-100 border-2 border-gray-600 justify-between">
      <div className="mr-[50px] ml-[46px]">
        <div className="flex align-center">
          {props.opened && props.opened.length > 0 ? (
            props.opened.map((content) => (
              <div
                className="p-0 m-0 bg-gray-800 h-[48px]"
                key={props.opened.indexOf(content)}
                onClick={() => handleChangePage(props.opened.indexOf(content))}
              >
                <Tab
                  path={content.path}
                  config={props}
                  keyy={props.opened.indexOf(content)}
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
        <div className="flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]">
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
