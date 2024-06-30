import React from "react";

export const Terminal: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="h-full w-full border-x-2 border-t-2 border-skin-stroke-light bg-skin-bg-dark">
      <div className="m-4 text-xl">{content}</div>
    </div>
  );
};
