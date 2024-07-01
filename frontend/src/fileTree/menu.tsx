import { FileTree } from "./fileTree";
import Item from "./item";
import React from "react";

interface MenuProps {
  items:FileTree;
  expandedFolder: string[];
  toggleFolder: (path: string) => void;
  openFile: (path: string) => void;
  onAction: (action: string, srcpath: string, name: string) => Promise<void>;
  theme: string;
}

const Menu : React.FC<MenuProps>= ({
  items,
  expandedFolder,
  toggleFolder,
  openFile,
  onAction,
  theme,
}) => {
  return (
    <div className="wrapper overflow-auto">
      <Item
        key={items.path}
        item={items}
        expandedFolder={expandedFolder}
        toggleFolder={toggleFolder}
        openFile={openFile}
        onAction={onAction}
        theme={theme}
      />
    </div>
  );
};

export default Menu;
