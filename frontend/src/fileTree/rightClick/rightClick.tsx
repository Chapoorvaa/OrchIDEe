import React from 'react';
import BasicComp from './basicComp';

const RightClick: React.FC = () => {

    const handleNewFileClick = () => {
        console.log("new file clicked");
    };

    const handleNewFolderClick = () => {
        console.log("new folder clicked");
    };

    const handleRenameClick = () => {
        console.log("rename clicked");
    };

    const handleDeleteClick = () => {
        console.log("delete clicked");
    };

    return (
        <div className="h-full w-[20rem] flex justify-between flex-col bg-gray-800 text-gray-100 border-y-1 border-gray-600">
            
            <BasicComp content="new file" onClick={handleNewFileClick}/>
            <BasicComp content="new folder" onClick={handleNewFolderClick}/>
            <BasicComp content="rename" onClick={handleRenameClick}/>
            <BasicComp content="delete" onClick={handleDeleteClick}/>
        </div>
    );
};

export default RightClick;