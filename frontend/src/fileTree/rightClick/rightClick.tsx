import React from "react";
import BasicComp from "./basicComp";

const RightClick: React.FC<{
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
}> = ({ position, onClose, onAction }) => {
  const handleActionClick = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <div
      className="absolute h-[120px] w-[200px] flex justify-between flex-col bg-skin-bg-dark text-skin-text-primary border border-skin-stroke-light z-50"
      style={{ top: position.y, left: position.x }}
    >
      <BasicComp
        content="new file"
        onClick={() => handleActionClick("new file")}
      />
      <BasicComp
        content="new folder"
        onClick={() => handleActionClick("new folder")}
      />
      <BasicComp content="rename" onClick={() => handleActionClick("rename")} />
      <BasicComp content="delete" onClick={() => handleActionClick("delete")} />
    </div>
  );
};

export default RightClick;
