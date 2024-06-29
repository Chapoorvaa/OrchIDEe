import {useState} from "react";

const Item = ({item}) => {

    const [isOpened,setIsOpened] = useState(false);


    return (
        <div className="menu-item">
            <div
                className="flex items-center cursor-pointer pl-4"
                onClick={() => item.type === "folder" && setIsOpened(!isOpened)}
            >
                {item.type === "folder" && (
                    <>
                        <span className="mr-2">
                            <span className="arrow-icon">{isOpened ? "⌄" : ">"}</span>
                        </span>
                        <img
                            src={"../../public/folder.png"}
                            alt="Folder Icon"
                            className="w-4 h-4 mr-2"
                        />
                    </>
                )}
                <div>{item.name}</div>
            </div>
            {item.children && isOpened && (
                <div className="ml-4">
                    {item.children.map((subitem, index) => (
                        <Item key={index} item={subitem} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Item;