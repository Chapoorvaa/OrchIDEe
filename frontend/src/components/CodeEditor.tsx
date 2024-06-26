import { Editor, type Monaco } from "@monaco-editor/react";
import Monokai_Bright from "../editor-theme/Monokai.json";

interface Config {
  language: string;
  tabSize: number;
}

// TODO: load the theme that in the config file

const CodeEditor = (props: Config) => {
  const options = {
    tabSize: props.tabSize,
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("MonokaiBright", {
      base: "vs",
      ...Monokai_Bright,
    });
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
