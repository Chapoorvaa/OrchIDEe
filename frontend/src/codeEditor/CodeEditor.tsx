import { Editor, loader, type Monaco } from "@monaco-editor/react";
import Monokai from "./editor-theme/Monokai.json";
import Orchidee from "./editor-theme/Orchidee.json";
import path from "path";

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
      fontFamily: props.font,
      fontSize: props.fontSize,
    };

    const handleEditorDidMount = (monaco: Monaco) => {
      monaco.editor.defineTheme("monokai", {
        base: "vs",
        ...Monokai,
      });
      monaco.editor.defineTheme("orchidee", {
        base: "vs",
        ...Orchidee,
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
          theme={props.theme === "white" ? "vs" : props.theme}
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
