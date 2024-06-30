import React, { useState } from "react";
import Chatbot, { Message } from "./chatbot/Chatbot";
import Git from "./git/Git";
import LeftBar from "./leftBar/LeftBar";
import FileTree from "./fileTree/fileTree";
import RightBar from "./rightBar/rightBar";
import { CodeEditor } from "./codeEditor/CodeEditor";
import { File } from "./codeEditor/CodeEditor";
import { ProjectDescProps } from "./App";
import { BottomBar } from "./bottomBar/bottomBar";
import { Terminal } from "./terminal/Terminal";
import { Settings } from "./settings/Settings";
import StatusBar from "./statusBar/StatusBar";
import Shortcut from "./Shortcuts";

export const BasePage: React.FC<ProjectDescProps> = (
  desc: ProjectDescProps
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [leftComponent, setLeftComponent] = useState<string>("");
  const [rightComponent, setRightComponent] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [terminalContent, setTerminalContent] = useState<string>("");
  const [visibleComponent, setVisibleComponent] = useState<string>("");
  const [visibleComponent2, setVisibleComponent2] = useState<string>("");
  
  const [expandedFolder, setExpandedFolder] = useState<string[]>([]);

  const toggleFolder = (tf: string) => {
        setExpandedFolder((prevExpandedFolder) =>
            prevExpandedFolder.includes(tf)
                ? prevExpandedFolder.filter((folder) => folder !== tf)
                : [...prevExpandedFolder, tf]
        );
    };


  const File1 = {
    path: "tqt",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  const File2 = {
    path: "bogosort.java",
    content:
      'import java.util.Arrays;\nimport java.util.Random;\n\npublic class BogoSort {\n\n\t// Méthode principale\n\tpublic static void main(String[] args) {\n\t\tint[] array = {3, 2, 5, 1, 4};\n\t\tSystem.out.println("Array avant le tri : " + Arrays.toString(array));\n\t\tbogoSort(array);\n\t\tSystem.out.println("Array après le tri : " + Arrays.toString(array));\n\t}\n\n\t// Méthode pour effectuer le Bogo Sort\n\tpublic static void bogoSort(int[] array) { \n\t\tRandom random = new Random();\n\t\twhile (!isSorted(array)) {\n\t\t\tshuffle(array, random);\n\t\t}\n\t}\n\n\t// Méthode pour vérifier si l\'array est triépublic \n\tstatic boolean isSorted(int[] array) {\n\t\tfor (int i = 0; i < array.length - 1; i++) {\n\t\t\tif (array[i] > array[i + 1])\n\t\t\t\treturn false;\n\t\t}\n\t}\n};',
  };
  const File3 = { path: "jsp", content: "fiekdjfjkljskl" };
  const [openedFiles, setOpenedFiles] = useState<File[]>([File1, File2, File3]);

  const handleShowFileTree = () => {
    if (leftComponent === "fileTree") {
      setLeftComponent("");
    } else {
      setLeftComponent("fileTree");
    }
  };

  const handleShowGitInterface = () => {
    if (leftComponent === "gitInterface") {
      setLeftComponent("");
    } else {
      setLeftComponent("gitInterface");
    }
  };

  const handleShowTerminalInterface = () => {
    setShowTerminal(!showTerminal);
  };

  const handleShowBot = () => {
    if (rightComponent === "chatBot") {
      setRightComponent("");
    } else {
      setRightComponent("chatBot");
    }
  };

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const toggleSettings = (): void => {
    setShowSettings(!showSettings);
  };

  const chatbotProp = {
    messages: messages,
    appendMessage: appendMessage,
    projProp: desc,
  };

  const path = "/home/emmanuel/gittest4ping";
  const bottomProp = {
    path,
  };

  const settingsProp = {
    toggleInterface: toggleSettings,
    theme: desc.theme,
    setTheme: desc.setTheme,
    font: desc.font,
    setFont: desc.setFont,
    fontSize: desc.fontSize,
    setFontSize: desc.setFontSize,
    spacing: desc.spacing,
    setSpacing: desc.setSpacing,
  };

  function giveMeGridCol(left: boolean, right: boolean) {
    if (left && right) {
      return "grid-cols-[50px_300px_calc(100vw-45vw-400px)_45vw_50px]";
    } else if (left) {
      return "grid-cols-[50px_300px_calc(100vw-400px)_0vw_50px]";
    } else if (right) {
      return "grid-cols-[50px_0px_calc(100vw-45vw-100px)_45vw_50px]";
    } else {
      return "grid-cols-[50px_0px_calc(100vw-100px)_0vw_50px]";
    }
  }

  function giveMeGridRow(terminal: boolean) {
    if (terminal) {
      return "grid-rows-[50px_calc(100vh-400px)_300px_50px]";
    } else {
      return "grid-rows-[50px_calc(100vh-100px)_0px_50px]";
    }
  }

  const configProp = {
    language: desc.language,
    tabSize: 4,
    opened: openedFiles,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    setOpenedFiles: setOpenedFiles,
    theme: desc.theme,
    font: desc.font,
    fontSize: desc.fontSize,
    lineSpace: desc.spacing,
  };
  console.log(desc.path);

  return (
    <>
      <Shortcut />
      <div
        className={`m-0 grid h-screen w-screen font-custom ${giveMeGridCol(
          leftComponent !== "",
          rightComponent !== ""
        )} ${giveMeGridRow(
          showTerminal
        )} bg-skin-bg-medium text-skin-text-primary`}
      >
        <div className="col-span-5 font-custom">
          <StatusBar
            opened={openedFiles}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOpenedFiles={setOpenedFiles}
            playFunction={setShowTerminal}
            ProjectLanguage={desc.language}
            Projectname={desc.name}
            setTerminalContent={setTerminalContent}
            settingsProp={settingsProp}
            onShowSettings={setShowSettings}
            theme={desc.theme}
          />
        </div>
        <div className="col-start-1 row-start-2 font-custom">
          <LeftBar
            onShowFileTree={handleShowFileTree}
            onShowGitInterface={handleShowGitInterface}
            onShowTerminalInterface={handleShowTerminalInterface}
            theme={desc.theme}
            font={desc.font}
          />
        </div>
        <div className="col-start-2 row-start-2 font-custom">
          {leftComponent === "fileTree" && <FileTree />}
          {leftComponent === "gitInterface" && <Git {...desc} />}
        </div>
        <div className="col-start-3 row-start-2 font-custom">
          <CodeEditor {...configProp} />
        </div>
        <div className="col-start-5 row-start-2 font-custom">
          <RightBar
            onShowBot={handleShowBot}
            theme={desc.theme}
            font={desc.font}
          />
        </div>
        <div className="col-start-4 row-start-2 font-custom">
          {rightComponent === "chatBot" && <Chatbot {...chatbotProp} />}
        </div>
        <div className="col-span-5 col-start-1 row-start-3 font-custom">
          {showTerminal && <Terminal content={terminalContent} />}
        </div>
        <div className="col-span-5 row-start-4 font-custom">
          <BottomBar {...bottomProp} />
        </div>
      </div>

      <div>{showSettings && <Settings {...settingsProp} />}</div>
    </>

      <div className="col-start-2 row-start-2">
        {visibleComponent === "fileTree" && <FileTree {...desc} expandedFolder={expandedFolder} toggleFolder={toggleFolder} />}
        {visibleComponent === "gitInterface" && <Git {...desc} />}
      </div>
      <div className="col-start-3 row-start-2">
        <CodeEditor language="java" tabSize={4} opened={openedFiles} />
      </div>
      <div className="col-start-5 row-start-2">
        <RightBar onShowBot={handleShowBot} />
      </div>
      <div className="col-start-4 row-start-2">
        {visibleComponent2 === "chatBot" && <Chatbot {...desc} />}
      </div>
      <div className="col-span-5 row-start-4">Bottom bar</div>
      <div className="col-start-1 row-start-5"></div>
    </div>

  );
};

export default BasePage;
