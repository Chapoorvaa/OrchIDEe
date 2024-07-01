import Item from "./item";

const Menu = ({ items, expandedFolder, toggleFolder, openFile, onAction }) => {
  return (
    <div className="wrapper overflow-auto">
        <Item
          key={items.path}
          item={items}
          expandedFolder={expandedFolder}
          toggleFolder={toggleFolder}
          openFile={openFile}
          onAction={onAction}
        />
    </div>
  );
};

export default Menu;
