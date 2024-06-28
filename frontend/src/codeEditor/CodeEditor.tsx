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

interface Config {
  language: string;
  tabSize: number;
  opened: string[];
}

// TODO: load the theme that in the config file

const CodeEditor = (props: Config) => {
  const [currentPage, setCurrentPage] = useState(0);

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

    const handleChangePage = (index: number) => {
      setCurrentPage(index);
      console.log(currentPage);
    };

    return (
      <>
        <div className="block ">
          <ul className="flex justify-start overflow-x-scroll no-scrollbar">
            {props.opened && props.opened.length > 0 ? (
              props.opened.map((content) => (
                <li
                  className=" bg-slate-500 px-10"
                  key={props.opened.indexOf(content)}
                  onClick={() =>
                    handleChangePage(props.opened.indexOf(content))
                  }
                >
                  {content}
                </li>
              ))
            ) : (
              <li></li>
            )}
          </ul>
        </div>
        <Editor
          height="90vh"
          width="100%"
          theme="MonokaiBright"
          defaultLanguage={props.language}
          value={props.opened[currentPage]}
          defaultValue={props.opened[currentPage]}
          options={options}
          beforeMount={handleEditorDidMount}
        />
      </>
    );
  }
};

export default CodeEditor;
