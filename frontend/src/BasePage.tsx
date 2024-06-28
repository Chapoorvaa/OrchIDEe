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
          opened={[File1, File2, File3]}
        />
      </div>
      <div className="col-start-5 row-start-2">
        <RightBar onShowBot={handleShowBot} />
      </div>
      <div className="col-start-4 row-start-2">
        {visibleComponent2 === "chatBot" && <Chatbot />}
      </div>
      <div className="col-span-5 row-start-4">Bottom bar</div>
      <div className="col-start-1 row-start-5"></div>
    </div>
  );
};

export default BasePage;
