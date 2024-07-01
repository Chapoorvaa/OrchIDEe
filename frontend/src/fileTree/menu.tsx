import Item from './item'

const Menu = ({items, expandedFolder, toggleFolder, onAction}) => {

    return (
        <div className="wrapper overflow-auto">
            <Item
                key={items.path}
                item={items}
                expandedFolder={expandedFolder}
                toggleFolder={toggleFolder}
                onAction={onAction}
            />
        </div>
    );
};

export default Menu;