import React, { useEffect, useState } from "react";

interface LeftBarProps {
  onShowFileTree: () => void;
  onShowGitInterface: () => void;
  theme: string;
}

const LeftBar: React.FC<LeftBarProps> = ({
  onShowFileTree,
  onShowGitInterface,
  theme,
}) => {
  const [projectImage, setProjectImage] = useState("");

  useEffect(() => {
    const changeTheme =
      theme !== "orchidee"
        ? ["../projectButton", `${theme}`, ".png"].join("")
        : "../projectButton.png";
    setProjectImage(changeTheme);
  });
  return (
    <div className="h-full border-x-2 border-skin-stroke-light bg-skin-bg-dark">
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowFileTree}
          className="flex items-center text-skin-text-primary font-semibold h-[17vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-gray-800"
        >
          <img src={projectImage} alt="Project Button" />
        </button>
      </div>
      <div className="flex border-b-2 border-skin-stroke-light">
        <button
          type="button"
          onClick={onShowGitInterface}
          className="flex items-center text-skin-text-primary font-semibold h-[13vh] w-full rounded-none bg-skin-bg-dark p-0 hover:brightness-125 transition hover:border-gray-800"
        >
          <img
            src={
              theme !== "orchidee"
                ? ["../gitButton", `${theme}`, ".png"].join("")
                : "../gitButton.png"
            }
            alt="Git Button"
          />
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
