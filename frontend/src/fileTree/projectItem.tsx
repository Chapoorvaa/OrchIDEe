const ProjectItem = ({ projectName }) => {
    return (
        <div className="flex items-center">
            <span className="arrow-icon mr-2 font-bold"> ⌄ </span>
            <img src={"../../public/folder.png"} alt="Folder Icon" className="w-5 h-5 mr-2"/>
            <div>{projectName}</div>
        </div>
    );
};

export default ProjectItem;
