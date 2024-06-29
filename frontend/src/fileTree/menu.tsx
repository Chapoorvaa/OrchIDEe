import Item from './item'

const Menu = ({items, expandedFolder, toggleFolder}) => {

    return <div className="wrapper overflow-auto">
        {items.children.map(item => <Item key={item.path} item={item} expandedFolder={expandedFolder} toggleFolder={toggleFolder}/>)}
    </div>
};

export default Menu;