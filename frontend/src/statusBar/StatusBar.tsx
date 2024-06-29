import React from "react";
import { Config } from "../codeEditor/CodeEditor";
import Tab from "./Tab";

export interface StatusBarProps {
  path: string;
}

const StatusBar: React.FC<Config> = (props: Config) => {
  const handleChangePage = (index: number) => {
    props.setCurrentPage(index);
    console.log(props.currentPage);
    console.log(props.opened[props.currentPage].content);
  };

  return (
    <div className="flex h-full w-full bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light justify-between pr-[50px] pl-[150px]">
      <div className="border-2 border-skin-stroke-light w-[1500px]">
        <div className="block ">
          <ul className="flex justify-start overflow-x-scroll no-scrollbar">
            {props.opened && props.opened.length > 0 ? (
              props.opened.map((content) => (
                <li
                  className=" bg-slate-500 px-10"
                  key={props.opened.indexOf(content)}
                  onClick={() =>
                    handleChangePage(props.opened.indexOf(content))
                  }
                >
                  <Tab path={content.path} />
                </li>
              ))
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]">
          <img src="../save.png" className="w-6 h-6" />
        </div>
        <div className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]">
          <img src="../settings.png" className="w-6 h-6" />
        </div>
        <div className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]">
          <img src="../play.png" className="w-6 h-6" />
        </div>
        <div className="flex justify-center items-center rounded-none bg-skin-bg-dark hover:opacity-40 hover:border-skin-stroke-dark h-[46px] w-[50px]">
          <img src="../build.png" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
