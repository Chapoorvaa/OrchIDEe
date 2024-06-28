import React, { useState } from "react";
import Chatbot from "./chatbot/Chatbot";
import Git from "./git/Git";
import LeftBar from "./leftBar/LeftBar";
import FileTree from "./fileTree/fileTree";
import RightBar from "./rightBar/rightBar";
import CodeEditor from "./codeEditor/CodeEditor";

export const BasePage: React.FC = () => {
  const [visibleComponent, setVisibleComponent] = useState<string>("");
  const [visibleComponent2, setVisibleComponent2] = useState<string>("");

  const handleShowFileTree = () => {
    if (visibleComponent === "fileTree") {
      setVisibleComponent("");
    } else {
      setVisibleComponent("fileTree");
    }
  };

  const handleShowGitInterface = () => {
    if (visibleComponent === "gitInterface") {
      setVisibleComponent("");
    } else {
      setVisibleComponent("gitInterface");
    }
  };

  const handleShowBot = () => {
    if (visibleComponent2 === "chatBot") {
      setVisibleComponent2("");
    } else {
      setVisibleComponent2("chatBot");
    }
  };

  return (
    <div className="m-0 grid h-screen w-screen grid-cols-[50px_300px_1fr_300px_50px] grid-rows-[50px_1fr_repeat(2,50px)] bg-gray-700 text-gray-100">
      <div className="col-span-5">Status bar</div>
      <div className="col-start-1 row-start-2">
        <LeftBar
          onShowFileTree={handleShowFileTree}
          onShowGitInterface={handleShowGitInterface}
        />
      </div>
      <div className="col-start-2 row-start-2">
        {visibleComponent === "fileTree" && <FileTree />}
        {visibleComponent === "gitInterface" && <Git />}
      </div>
      <div className="col-start-3 row-start-2">
        <CodeEditor
          language="java"
          tabSize={4}
          opened={["pagec kd;kl;kl;k1", "pagecdlkl;kcl;2", "page 3"]}
        />
      </div>
      <div className="col-start-5 row-start-2">
        <RightBar onShowBot={handleShowBot} />
      </div>
      <div className="col-start-4 row-start-2">
        {visibleComponent2 === "chatBot" && <Chatbot />}
      </div>
      <div className="col-span-5 col-start-1 row-start-3">Terminal</div>
      <div className="col-span-5 row-start-4">Bottom bar</div>
      <div className="col-start-1 row-start-5"></div>
    </div>
  );
};

export default BasePage;
