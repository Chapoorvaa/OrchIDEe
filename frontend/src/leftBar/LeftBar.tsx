import React from "react";

interface LeftBarProps {
  onShowFileTree: () => void;
  onShowGitInterface: () => void;
  onShowTerminalInterface: () => void;
  theme: string;
  font: string;
}

const LeftBar: React.FC<LeftBarProps> = ({
  onShowFileTree,
  onShowGitInterface,
  onShowTerminalInterface,
  theme,
  font,
}) => {
  return (
    <div className="flex flex-col justify-between h-full border-x-2 border-skin-stroke-light bg-skin-bg-dark">
      <div>
        <div className="flex border-b-2 border-skin-stroke-light">
          <button
            type="button"
            onClick={onShowFileTree}
            className="flex items-center text-skin-text-primary font-semibold h-[17vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-skin-stroke-dark"
          >
            <img
              src={["../projectButton/", `${theme}`, `${font}`, ".png"].join(
                ""
              )}
              alt="Project Button"
            />
          </button>
        </div>
        <div className="flex border-b-2 border-skin-stroke-light">
          <button
            type="button"
            onClick={onShowGitInterface}
            className="flex items-center text-skin-text-primary font-semibold h-[13vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-skin-stroke-dark"
          >
            <img
              src={["../gitButton/", `${theme}`, `${font}`, ".png"].join("")}
              alt="Git Button"
            />
          </button>
        </div>
      </div>
      <div className="flex border-t-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowTerminalInterface}
          className="flex items-center text-skin-text-primary font-semibold h-[5vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-skin-stroke-dark"
        >
          <img
            src={theme === "Light" ? "../playwhite.png" : "../play.png"}
            alt="Terminal Button"
            className="mx-auto size-8"
          />
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
