type contentProps = {
  content: string;
  onClick: () => void;
};

const BasicComp: React.FC<contentProps> = ({ content, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="w-full h-full flex justify-between items-center flex-col bg-skin-bg-dark text-skin-text-primary text-16xl font-bold border-b-2 border-skin-stroke-dark cursor-pointer  hover:bg-skin-bg-light hover:text-skin-text-tertiary"
      onClick={handleClick}
    >
      <h2>{content}</h2>
    </div>
  );
};

export default BasicComp;
