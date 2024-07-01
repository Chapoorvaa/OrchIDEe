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
import { fetchOpenFile } from "./BasePageService";

export const BasePage: React.FC<ProjectDescProps> = (
  desc: ProjectDescProps
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [leftComponent, setLeftComponent] = useState<string>("");
  const [rightComponent, setRightComponent] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [terminalContent, setTerminalContent] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [openedFiles, setOpenedFiles] = useState<File[]>([]);
  const [expandedFolder, setExpandedFolder] = useState<string[]>([]);

  const openFile = async (path: string) => {
    let page = openedFiles.findIndex((e) => e.path == path);
    if (page != -1) {
      setCurrentPage(page);
    } else {
      let content = await fetchOpenFile(path);
      setOpenedFiles((prevFiles) => [
        ...prevFiles,
        { path: path, content: content },
      ]);
      setCurrentPage(openedFiles.length);
    }
  };

  const toggleFolder = (tf: string) => {
    setExpandedFolder((prevExpandedFolder) =>
      prevExpandedFolder.includes(tf)
        ? prevExpandedFolder.filter((folder) => folder !== tf)
        : [...prevExpandedFolder, tf]
    );
  };

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

  const path = desc.path;
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
        <div className="col-start-2 row-start-2">
          {leftComponent === "fileTree" && (
            <FileTree
              {...desc}
              expandedFolder={expandedFolder}
              toggleFolder={toggleFolder}
              openFile={openFile}
            />
          )}
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
  );
};

export default BasePage;
