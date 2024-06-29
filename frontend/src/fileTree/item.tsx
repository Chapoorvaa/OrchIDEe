import {useState} from "react";

const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
        case 'cpp':
        case 'hpp':
        case 'cc':
        case 'hh':
        case 'hxx':
            return "../../public/cpp.png";
        case 'java':
            return "../../public/java.png";
        default:
            return null;
    }
};

const Item = ({item}) => {

    const [isOpened,setIsOpened] = useState(false);
    const fileIcon = getFileIcon(item.name);


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
               {item.type === "file" && fileIcon && (
                    <img
                        src={fileIcon}
                        alt="File Icon"
                        className="w-4 h-4 mr-2"
                    />
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