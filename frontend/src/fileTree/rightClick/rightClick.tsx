import React from 'react';
import BasicComp from './basicComp';

const RightClick: React.FC <{ position: { x: number, y: number }, onClose: () => void }> = ({ position, onClose }) => {

    const handleNewFileClick = () => {
        console.log("new file clicked");
        onClose();
    };

    const handleNewFolderClick = () => {
        console.log("new folder clicked");
        onClose();
    };

    const handleRenameClick = () => {
        console.log("rename clicked");
        onClose();
    };

    const handleDeleteClick = () => {
        console.log("delete clicked");
        onClose();
    };

    return (
            <div
                className="absolute h-[30px] w-[200px] flex justify-between flex-col bg-gray-800 text-gray-100 border border-gray-600 z-50"
                style={{ top: position.y, left: position.x }}
            >
            <BasicComp content="new file" onClick={handleNewFileClick}/>
            <BasicComp content="new folder" onClick={handleNewFolderClick}/>
            <BasicComp content="rename" onClick={handleRenameClick}/>
            <BasicComp content="delete" onClick={handleDeleteClick}/>
        </div>
    );
};

export default RightClick;