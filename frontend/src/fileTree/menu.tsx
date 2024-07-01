import Item from "./item";

const Menu = ({
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
