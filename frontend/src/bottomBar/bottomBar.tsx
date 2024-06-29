import React from "react";

export interface BottomBarProps {
  path: string;
}

export const BottomBar: React.FC<BottomBarProps> = (prop: BottomBarProps) => {
  return (
    <div className="h-full w-full border-2 border-skin-stroke-light bg-skin-bg-dark flex items-center">
      <div className="ml-2 text-lg">{prop.path}</div>
    </div>
  );
};
