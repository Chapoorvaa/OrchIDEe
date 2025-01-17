import { useState, useEffect } from "react";
import RightClick from "./rightClick/rightClick";
import UserInput from "./userInput/userInput";
import { FileTree } from "./fileTree";

const getFileIcon = (fileName: string): string | null => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "cpp":
    case "hpp":
    case "cc":
    case "hh":
    case "hxx":
      return "/cpp.png";
    case "java":
      return "/java.png";
    default:
      return null;
  }
};

interface ItemProps {
  item: FileTree;
  expandedFolder: string[];
  toggleFolder: (path: string) => void;
  openFile: (path: string) => void;
  onAction: (action: string, srcpath: string, name: string) => Promise<void>;
  theme: string;
}

const Item: React.FC<ItemProps> = ({
  item,
  expandedFolder,
  toggleFolder,
  openFile,
  onAction,
  theme,
}) => {
  const [isRightClickVisible, setRightClickVisible] = useState(false);
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [inputVisible, setInputVisible] = useState(false);
  const [inputAction, setInputAction] = useState("");

  const isOpened = expandedFolder.includes(item.path);
  const fileIcon = getFileIcon(item.name);

  const handleRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightClickVisible(true);
    setRightClickPosition({ x: e.pageX, y: e.pageY });
  };

  const handleCloseRightClick = () => {
    setRightClickVisible(false);
  };

  const handleRclickAction = (action: string) => {
    if (action === "delete") {
      onAction(action, item.path, "");
    } else {
      setInputAction(action);
      setInputVisible(true);
    }
  };

  const handleInputSubmit = (name: string) => {
    onAction(inputAction, item.path, name);
    setInputVisible(false);
  };

  const handleInputCancel = () => {
    setInputVisible(false);
  };

  useEffect(() => {
    if (isRightClickVisible) {
      document.addEventListener("click", handleCloseRightClick);
      return () => {
        document.removeEventListener("click", handleCloseRightClick);
      };
    }
  }, [isRightClickVisible]);

  return (
    <div className="menu-item" onContextMenu={handleRightClick}>
      <div
        className="flex items-center cursor-pointer pl-4 hover:bg-skin-bg-light"
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          if (item.type === "folder") {
            toggleFolder(item.path);
          } else {
            openFile(item.path);
          }
        }}
      >
        {item.type === "folder" && (
          <>
            <span className="mr-2">
              <span className="arrow-icon">{isOpened ? "⌄" : ">"}</span>
            </span>
            <img
              src={theme !== "Light" ? "/folder.png" : "/darkFolder.png"}
              alt="Folder Icon"
              className="w-4 h-4 mr-2"
            />
          </>
        )}
        {item.type === "file" && fileIcon && (
          <img src={fileIcon} alt="File Icon" className="w-5 h-5 mr-2" />
        )}
        <div>{item.name}</div>
      </div>
      {item.children && isOpened && (
        <div className="ml-4">
          {item.children.map((subitem: FileTree, index: number) => (
            <Item
              key={index}
              item={subitem}
              expandedFolder={expandedFolder}
              toggleFolder={toggleFolder}
              openFile={openFile}
              onAction={onAction}
              theme={theme}
            />
          ))}
        </div>
      )}
      {isRightClickVisible && (
        <RightClick
          position={rightClickPosition}
          onClose={handleCloseRightClick}
          onAction={handleRclickAction}
        />
      )}
      {inputVisible && (
        <UserInput
          title={`${inputAction}`}
          placeholder="Enter name"
          onSubmit={handleInputSubmit}
          onCancel={handleInputCancel}
        />
      )}
    </div>
  );
};

export default Item;
