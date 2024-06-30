import React, { useState, useEffect } from "react";
import { File } from "../codeEditor/CodeEditor";

export interface TabProps {
  path: string;
  tabIndex: number;
  opened: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOpenedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Tab: React.FC<TabProps> = (prop: TabProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("unknown");

  useEffect(() => {
    if (prop.path) {
      const name = prop.path.substring(prop.path.lastIndexOf("/") + 1);
      const extension = name.split(".").pop();

      if (extension === "java") {
        setLanguage("./java.png");
      } else if (extension === "cc") {
        setLanguage("./cpp.png");
      } else {
        setLanguage("unknown");
      }
    }
  }, [prop.path]);

  function handleClick() {
    if (prop.tabIndex !== undefined) {
      const newOpenedFiles = prop.opened.filter(
        (_, index) => index !== prop.tabIndex
      );
      prop.setOpenedFiles(newOpenedFiles);
      console.log("opened : ", newOpenedFiles);
      console.log("currentPage : ", prop.currentPage);
      console.log("tabIndex : ", prop.tabIndex);

      if (prop.tabIndex === prop.currentPage) {
        prop.setCurrentPage(0);
      } else if (prop.tabIndex < prop.currentPage) {
        prop.setCurrentPage(prop.currentPage - 1);
      }
    } else {
      console.warn("tabIndex is undefined");
    }
  }

  return (
    <div
      className={`flex h-[48px] min-w-[36px] bg-gray-800 text-gray-100 border-2 border-gray-600 ${
        isHovered ? "brightness-125" : "brightness-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center">
        <img
          src={language}
          alt={language}
          className="ml-2 mr-2 h-[25px] w-[25px]"
        />
      </div>
      <div className="text-xl">
        <p>
          {prop.path
            ? prop.path.substring(prop.path.lastIndexOf("/") + 1)
            : "Unknown"}
        </p>
      </div>
      <div className="flex justify-center items-center" onClick={handleClick}>
        <img
          src="../cross.png"
          alt="cross"
          className={`ml-2 mr-2 h-[14px] w-[14px] hover:opacity-60 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Tab;