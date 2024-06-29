import Item from './item'

const Menu = ({items}) => {

    return <div className="wrapper">
        {items.children.map(item => <Item item={item}/>)}
    </div>
};

export default Menu;