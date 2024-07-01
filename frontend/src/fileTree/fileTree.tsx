import React, { useState, useEffect } from "react";
import { ProjectDescProps } from "../App";
import {
  buildFileTree,
  createFile,
  createFolder,
  deleteFileorFolder,
  renameFileorFolder,
} from "./fileTreeService";
import Menu from "./menu";

const FileTree: React.FC<
  ProjectDescProps & {
    expandedFolder: string[];
    toggleFolder: (path: string) => void;
    openFile: (path: string) => void;
  }
> = (desc) => {
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
      console.error("Error fetching file tree:", error);
    }
  };

  useEffect(() => {
    fetchFileTree();
  }, [desc.path]);

  const handleAction = async (action, srcpath, name) => {
    switch (action) {
      case "new file":
        let newPath = srcpath + "/" + name;
        console.log(newPath);
        await createFile(newPath);
        break;

      case "new folder":
        let newFolderPath = srcpath + "/" + name;
        console.log("new folder");
        await createFolder(newFolderPath);
        break;

      case "rename":
        console.log("rename");
        await renameFileorFolder(name, srcpath);
        break;

      case "delete":
        console.log("delete");
        await deleteFileorFolder(srcpath);
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
    <div className="h-full w-full flex justify-start flex-col bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light">
      <Menu
        items={fileTree}
        expandedFolder={desc.expandedFolder}
        toggleFolder={desc.toggleFolder}
        openFile={desc.openFile}
        onAction={handleAction}
      />
    </div>
  );
};

export default FileTree;
