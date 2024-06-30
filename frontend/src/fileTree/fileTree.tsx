import React, { useState, useEffect } from "react";
import { ProjectDescProps } from "../App";
import RightClick from "./rightClick/rightClick";
import { buildFileTree } from "./fileTreeService";
import Menu from "./menu";
import ProjectItem from "./projectItem";
import UserInput from './userInput/userInput';

const FileTree: React.FC<ProjectDescProps & {expandedFolder: string[], toggleFolder: (path: string) => void}> =  (desc) => {
  const [fileTree, setFileTree] = useState<string>("");

  useEffect(() => {
    const fetchFileTree = async () => {
      try {
        const fTree = await buildFileTree(desc.path);
        setFileTree(fTree);
      } catch (error) {
        console.error("Error fetching filetree response:", error);
      }
    };
    fetchFileTree();
  }, [desc.path]);

    const fetchFileTree = async () => {
        try {
            const fTree = await buildFileTree(desc.path);
            setFileTree(fTree);
        } catch (error) {
            console.error('Error fetching file tree:', error);
        }
    };

    useEffect(() => {
        fetchFileTree();
    }, [desc.path]);

    const handleAction = (action, path, name) => {
        switch (action) {
            case "new file":
                console.log(name);
                console.log(path);

                break;
            case "new folder":
                console.log("new folder");

                break;
            case "rename":
                console.log("rename");

                break;
            case "delete":
                console.log("delete");
                console.log(path);
                break;
            default:
                break;
        }

        fetchFileTree();
    };

    if (!fileTree) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-full w-full flex justify-between flex-col bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light">
            <ProjectItem projectName={desc.name} />
            <Menu items={fileTree} expandedFolder={desc.expandedFolder} toggleFolder={desc.toggleFolder} onAction={handleAction}/>
        </div>
    );
};

export default FileTree;
