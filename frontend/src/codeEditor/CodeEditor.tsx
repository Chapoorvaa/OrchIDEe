import { Editor, loader, type Monaco } from "@monaco-editor/react";
import Monokai_Bright from "./editor-theme/Monokai.json";
import path from "path";
import { useState } from "react";

const __editor = path.resolve("node_modules/monaco-editor/min/vs");
loader.config({
  paths: {
    vs: __editor,
  },
});

export interface Config {
  language: string;
  tabSize: number;
  opened: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOpenedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

// pour apoorvaa a bouger dans ton fichier

export interface File {
  path: string;
  content: string;
}

// TODO: load the theme that in the config file

export const CodeEditor = (props: Config) => {

  if (props.opened.length != 0) {
    const options = {
      tabSize: props.tabSize,
    };

    const handleEditorDidMount = (monaco: Monaco) => {
      monaco.editor.defineTheme("MonokaiBright", {
        base: "vs",
        ...Monokai_Bright,
      });
    };


    const handleEditorChange = (value: string | undefined) => {
      if (typeof value === "string") {
        props.opened[props.currentPage].content = value;
      }
    };

    return (
      <>
        <Editor
          height="100%"
          width="100%"
          theme="MonokaiBright"
          defaultLanguage={props.language}
          value={props.opened[props.currentPage].content}
          defaultValue={props.opened[props.currentPage].content}
          options={options}
          beforeMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </>
    );
  }
};