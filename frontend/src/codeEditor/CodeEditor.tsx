import { Editor, loader, type Monaco } from "@monaco-editor/react";
import Monokai from "./editor-theme/Monokai.json";
import Orchidee from "./editor-theme/Orchidee.json";
import path from "path";
import { useEffect } from "react";

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
  theme: string;
  font: string;
  fontSize: number;
  lineSpace: number;
}

export interface File {
  path: string;
  content: string;
}

export const CodeEditor = (props: Config) => {
  useEffect(() => {
    if (props.opened.length === 0 && props.currentPage !== 0) {
      props.setCurrentPage(0);
    }
  }, [props.opened, props.currentPage, props.setCurrentPage]);

  if (!props.opened[props.currentPage]) {
    return <div></div>;
  }

  const options = {
    tabSize: props.tabSize,
    fontSize: props.fontSize,
    fontFamily: props.font,
    lineHeight: props.lineSpace >= 7 ? 7 : props.lineSpace,
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("Monokai", {
      base: "vs",
      ...Monokai,
    });
    monaco.editor.defineTheme("Default", {
      base: "vs",
      ...Orchidee,
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (typeof value === "string") {
      const newOpenedFiles = [...props.opened];
      newOpenedFiles[props.currentPage].content = value;
      props.setOpenedFiles(newOpenedFiles);
    }
  };

  const getFileLanguage = (): string => {
    let path = props.opened[props.currentPage].path;

    const name = path.substring(path.lastIndexOf("/") + 1);
    const extension = name.split(".").pop();

    if (name === "Makefile") {
      return "makefile";
    } else if (extension === "java") {
      return "java";
    } else if (extension === "cc" || extension === "cpp") {
      return "cpp";
    } else if (extension === "js") {
      return "javascript";
    } else if (extension === "ts") {
      return "typescript";
    } else if (extension === "py") {
      return "python";
    } else if (extension === "cs") {
      return "csharp";
    } else {
      return "plaintext";
    }
  };

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        theme={props.theme === "Light" ? "vs" : props.theme}
        language={getFileLanguage()}
        value={props.opened[props.currentPage].content}
        defaultValue={props.opened[props.currentPage].content}
        options={options}
        beforeMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </>
  );
};
