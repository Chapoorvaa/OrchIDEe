import React, { useState, useEffect } from 'react';
import { fetchGitResponse, commitChanges, pushChanges, fetchPull } from './GitService';

const Git: React.FC = () => {
    const [untracked, setUntracked] = useState<string[]>([]);
    const [added, setAdded] = useState<string[]>([]);
    const [modified, setModified] = useState<string[]>([]);
    const [uncommitted, setUncommitted] = useState<string[]>([]);
    const [commitMessage, setCommitMessage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGitResponse();
                setUntracked(response[0]);
                setAdded(response[1]);
                setModified(response[2]);
                setUncommitted(response[3]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching response:', error);
                setError('Failed to fetch response');
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const handleCommit = async () => {
        if (!commitMessage) {
            setError('Commit message cannot be empty');
            return;
        }
        try {
            setLoading(true);
            await commitChanges(commitMessage);
            setCommitMessage('');
            const response = await fetchGitResponse();
            setUntracked(response[0]);
            setAdded(response[1]);
            setModified(response[2]);
            setUncommitted(response[3]);
            setLoading(false);
        } catch (error) {
            console.error('Error committing changes:', error);
            setError('Failed to commit changes');
            setLoading(false);
        }
    };

    const handlePull = async () => {
        try {
            setLoading(true);
            await fetchPull();
            setLoading(false);
        } catch (error) {
            console.error('Error pulling changes:', error);
            setError('Failed to pull changes');
            setLoading(false);
        }
    };

    const handlePush = async () => {
        try {
            setLoading(true);
            await pushChanges();
            setLoading(false);
        } catch (error) {
            console.error('Error pushing changes:', error);
            setError('Failed to push changes');
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="h-full w-full flex justify-between flex-col bg-gray-800 text-gray-100 border-4 border-gray-600">
            <div className='text-left scroll-y-auto'>
                <div className=''>
                    <div className="border-gray-600">
                        <h3 className="text-lg mt-2 ml-2 font-semibold">Added files</h3>
                        {added.length === 0 ? <p className='ml-2 mb-2'>No added files</p> : (
                            <div className='ml-2 mb-2 overflow-y-auto max-h-[15vh]'>
                                <ul className="list-disc list-inside">
                                    {added.map(file => <li key={file}>{file}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="border-t-4 border-gray-600">
                        <h3 className="text-lg mt-2 ml-2 font-semibold">Modified files</h3>
                        {modified.length === 0 ? <p className='ml-2 mb-2'>No modified files</p> : (
                            <div className='ml-2 mb-2 overflow-y-auto max-h-[15vh]'>
                                <ul className="list-disc list-inside">
                                    {modified.map(file => <li key={file}>{file}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="border-t-4 border-gray-600">
                        <h3 className="text-lg font-semibold mt-2 ml-2">Untracked files</h3>
                        {untracked.length === 0 ? <p className='ml-2 mb-2'>No untracked files</p> : (
                            <div className='ml-2 mb-2 overflow-y-auto max-h-[15vh]'>
                                <ul className="list-disc list-inside">
                                    {untracked.map(file => <li key={file}>{file}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="border-y-4 border-gray-600">
                        <h3 className="text-lg font-semibold mt-2 ml-2">Uncommitted files</h3>
                        {uncommitted.length === 0 ? <p className='ml-2 mb-2'>No uncommitted files</p> : (
                            <div className='ml-2 mb-2 overflow-y-auto max-h-[15vh]'>
                                <ul className="list-disc list-inside">
                                    {uncommitted.map(file => <li key={file}>{file}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col border-t-4 border-gray-600'>
                <div className='flex flex-col items-start p-2 min-h-[15vh]'>
                    <p className='font-semibold mb-2'>New commit</p>
                    <input
                        type="text"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="Enter commit message..."
                        className="h-full w-full rounded-md bg-gray-700 mb-2 text-start p-2"
                    />
                    <button
                        onClick={handleCommit}
                        className="bg-gray-600 text-gray-100 p-1 rounded-md self-end"
                    >
                        Commit
                    </button>
                </div>
                <div className='flex justify-evenly border-t-4 border-gray-600 p-2'>
                    <button
                        onClick={handlePull}
                        className="bg-gray-600 text-gray-100 p-1 rounded-md mr-2"
                    >
                        Pull
                    </button>
                    <button
                        onClick={handlePush}
                        className="bg-gray-600 text-gray-100 p-1 rounded-md"
                    >
                        Push
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Git;
