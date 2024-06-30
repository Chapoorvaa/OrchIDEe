import { Editor, loader, type Monaco } from "@monaco-editor/react";
import Monokai_Bright from "./editor-theme/Monokai.json";
import path from "path";
import { useState, useEffect } from "react";

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

export interface File {
  path: string;
  content: string;
}

export const CodeEditor = (props: Config) => {
  const [editorMounted, setEditorMounted] = useState(false);

  useEffect(() => {
    if (props.opened.length === 0 && props.currentPage !== 0) {
      props.setCurrentPage(0);
    }
  }, [props.opened, props.currentPage, props.setCurrentPage]);

  if (!props.opened[props.currentPage]) {
    return <div>Invalid file index</div>;
  }

  const options = {
    tabSize: props.tabSize,
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("MonokaiBright", {
      base: "vs",
      ...Monokai_Bright,
    });
    setEditorMounted(true);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (typeof value === "string") {
      const newOpenedFiles = [...props.opened];
      newOpenedFiles[props.currentPage].content = value;
      props.setOpenedFiles(newOpenedFiles);
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
        options={options}
        beforeMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </>
  );
};
