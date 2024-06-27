import { Editor, loader, type Monaco } from "@monaco-editor/react";
import Monokai_Bright from "./editor-theme/Monokai.json";
import React from "react";
import path from "path";

function ensureFirstBackSlash(str) {
    return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str;
  }
  
  function uriFromPath(_path) {
    const pathName = path.resolve(_path).replace(/\\/g, '/');
    return encodeURI('file://' + ensureFirstBackSlash(pathName));
  }
  
  loader.config({
    paths: {
      vs: "/home/kty/Desktop/OrchIDEe/frontend/node_modules/monaco-editor/min/vs",
    },
  });

interface Config {
  language: string;
  tabSize: number;
}

// TODO: load the theme that in the config file

const CodeEditor = (props: Config) => {
    console.log(__dirname)
  const options = {
    tabSize: props.tabSize,
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("MonokaiBright", {
      base: "vs",
      ...Monokai_Bright}
    );
  };

  return (
    <Editor
      height="90vh"
      width="100%"
      theme="MonokaiBright"
      defaultLanguage={props.language}
      defaultValue="// idk "
      options={options}
      beforeMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;