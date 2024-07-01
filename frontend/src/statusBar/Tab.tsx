import React, { useState, useEffect } from "react";
import { File } from "../codeEditor/CodeEditor";

export interface TabProps {
  path: string;
  tabIndex: number;
  opened: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOpenedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  theme: string;
}

const Tab: React.FC<TabProps> = (prop: TabProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("unknown");

  useEffect(() => {
    if (prop.path) {
      const name = prop.path.substring(prop.path.lastIndexOf("/") + 1);
      const extension = name.split(".").pop();
      console.log(prop.theme);

      if (extension === "java") {
        setLanguage("./java.png");
      } else if (extension === "cc" || extension === "cpp") {
        setLanguage("./cpp.png");
      } else {
        setLanguage("unknown");
      }
    }
  }, [prop.path]);

  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();

    if (prop.tabIndex !== undefined) {
      const newOpenedFiles = prop.opened.filter(
        (_, index) => index !== prop.tabIndex
      );
      prop.setOpenedFiles(newOpenedFiles);

      if (prop.tabIndex === prop.currentPage) {
        prop.setCurrentPage(0);
      } else if (prop.tabIndex < prop.currentPage) {
        prop.setCurrentPage(prop.currentPage - 1);
      }
    } else {
      console.warn("tabIndex is undefined");
    }
  }

  function handleName() {
    let name = prop.path.substring(prop.path.lastIndexOf("/") + 1);
    if (name.length > 13) {
      name = name.slice(0, 10) + "...";
    }
    return name;
  }

  return (
    <div
      className={`flex h-[46px] min-w-[172px] max-w-[350px] bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light justify-between items-center ${
        prop.tabIndex === prop.currentPage ? "bg-skin-bg-medium" : ""
      } ${isHovered ? "brightness-125" : "brightness-100"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex justify-center items-center ${
          prop.tabIndex === prop.currentPage ? "bg-skin-bg-medium" : ""
        }`}
      >
        <img
          src={
            language !== "unknown"
              ? language
              : prop.theme !== "Light"
              ? "/file.png"
              : "/darkFile.png"
          }
          alt={language}
          className="ml-2 mr-2 h-[25px]"
        />
      </div>
      <div
        className={`text-xl ${
          prop.tabIndex === prop.currentPage ? "bg-skin-bg-medium" : ""
        }`}
      >
        <p>{handleName()}</p>
      </div>
      <div
        className={`flex justify-center items-center ${
          prop.tabIndex === prop.currentPage ? "bg-skin-bg-medium" : ""
        }`}
        onClick={handleClick}
      >
        <img
          src={prop.theme === "Light" ? "./crosswhite.png" : "./cross.png"}
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
