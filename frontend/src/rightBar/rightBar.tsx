import React from "react";

interface RightBarProps {
  onShowBot: () => void;
}

const RightBar: React.FC<RightBarProps> = ({ onShowBot }) => {
  return (
    <div className="h-full border-x-2 border-skin-stroke-light bg-skin-bg-dark">
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowBot}
          className="flex items-center text-skin-text-primary font-semibold h-[20vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-gray-800"
        >
          <img src="../botButton.png" alt="Bot Button" />
        </button>
      </div>
    </div>
  );
};

export default RightBar;
