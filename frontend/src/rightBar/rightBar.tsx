import React from "react";

interface RightBarProps {
  onShowBot: () => void;
  theme: string;
  font: string;
}

const RightBar: React.FC<RightBarProps> = ({ onShowBot, theme, font }) => {
  return (
    <div className="h-full border-x-2 border-skin-stroke-light bg-skin-bg-dark">
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowBot}
          className="flex items-center text-skin-text-primary font-semibold min-h-[20vh] max-h-[30vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-skin-stroke-dark"
        >
          <img
            src={["../assistantButton/", `${theme}`, `${font}`, ".png"].join(
              ""
            )}
            alt="Bot Button"
          />
        </button>
      </div>
    </div>
  );
};

export default RightBar;
