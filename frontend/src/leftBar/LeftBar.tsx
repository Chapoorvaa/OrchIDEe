import React from "react";

interface LeftBarProps {
  onShowFileTree: () => void;
  onShowGitInterface: () => void;
}

const LeftBar: React.FC<LeftBarProps> = ({
  onShowFileTree,
  onShowGitInterface,
}) => {
  return (
    <div className="h-full border-x-2 border-skin-stroke-light bg-skin-bg-dark">
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowFileTree}
          className="flex items-center text-skin-text-primary font-semibold h-[17vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-gray-800"
        >
          <img src="../projectButton.png" alt="Project Button" />
        </button>
      </div>
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowGitInterface}
          className="flex items-center text-skin-text-primary font-semibold h-[13vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-gray-800"
        >
          <img src="../gitButton.png" alt="Git Button" />
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
