type contentProps = {
    content: string;
    onClick: () => void;
};

const BasicComp : React.FC<contentProps> = ({content, onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return (
        <div className="w-full h-full flex justify-between flex-col bg-gray-500 text-gray-100 text-16xl font-bold border-b-2 border-gray-600 cursor-pointer" onClick={handleClick}>
            <h2>{content}</h2>
        </div>
    );
};

export default BasicComp;