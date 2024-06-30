import Item from './item'

const Menu = ({items, expandedFolder, toggleFolder, onAction}) => {

    return <div className="wrapper overflow-auto">
        {items.children.map(item =>
            <Item
                key={item.path}
                item={item}
                expandedFolder={expandedFolder}
                toggleFolder={toggleFolder}
                onAction={onAction}
            />)}
    </div>
};

export default Menu;