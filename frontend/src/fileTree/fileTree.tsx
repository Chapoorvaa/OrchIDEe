import React, { useState, useEffect } from 'react';
import { ProjectDescProps } from '../App';
import RightClick from './rightClick/rightClick';
import {buildFileTree} from './fileTreeService';
import Menu from './menu';
import ProjectItem from './projectItem';

const FileTree: React.FC<ProjectDescProps> =  (desc: ProjectDescProps) => {

    const [fileTree, setFileTree] = useState<string>('');

    useEffect(() => {
        const fetchFileTree = async () => {
            try {
                const fTree = await buildFileTree(desc.path);
                setFileTree(fTree);
            } catch (error) {
                console.error('Error fetching filetree response:', error);
            }
        };
        fetchFileTree();
    }, [desc.path]);

    if (!fileTree) {
        return <div>Loading...</div>;
    }
    console.log(fileTree);

    return (
        <div className="h-full w-full flex justify-between flex-col bg-skin-bg-dark text-skin-text-primary border-2 border-skin-stroke-light">
            <ProjectItem projectName={desc.name} />
            <Menu items={fileTree}/>
            <RightClick/>
        </div>
    );
};

export default FileTree;
