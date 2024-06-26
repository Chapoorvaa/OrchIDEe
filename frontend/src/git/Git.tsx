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
        <div className="git-status bg-gray-800 text-white border border-gray-600 justify-between">
            <div className='text-left'>
            <h2 className="text-xl font-bold mb-4">Git Status</h2>
            <div className='git-status-content'>
                <div className="border-t-2 border-gray-600 git-status-section">
                    <h3 className="text-lg font-semibold sticky top-0">Added files</h3>
                    {added.length === 0 ? <p>No added files</p> : (
                        <ul className="list-disc list-inside">
                            {added.map(file => <li key={file}>{file}</li>)}
                        </ul>
                    )}
                </div>
                <div className="border-t-2 border-gray-600 git-status-section">
                    <h3 className="text-lg font-semibold sticky top-0">Modified files</h3>
                    {modified.length === 0 ? <p>No modified files</p> : (
                        <ul className="list-disc list-inside">
                            {modified.map(file => <li key={file}>{file}</li>)}
                        </ul>
                    )}
                </div>
                <div className="border-t-2 border-gray-600 git-status-section">
                    <h3 className="text-lg font-semibold sticky top-0">Untracked files</h3>
                    {untracked.length === 0 ? <p>No untracked files</p> : (
                        <ul className="list-disc list-inside">
                            {untracked.map(file => <li key={file}>{file}</li>)}
                        </ul>
                    )}
                </div>
                <div className="border-y-2 border-gray-600 git-status-section">
                    <h3 className="text-lg font-semibold sticky top-0">Uncommitted files</h3>
                    {uncommitted.length === 0 ? <p>No uncommitted files</p> : (
                        <ul className="list-disc list-inside">
                            {uncommitted.map(file => <li key={file}>{file}</li>)}
                        </ul>
                    )}
                </div>
            </div>
            </div>
            <div className='git-status-footer border border-gray-600'>
                <div className="mb-4">
                    <p className='font-semibold text-left'>New commit</p>
                    <input
                        type="text"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="Enter commit message..."
                        className="w-full h-[20vh] rounded-md bg-gray-700 mr-4"
                    />
                </div>
                <div>
                    <button
                        onClick={handleCommit}
                        className="bg-gray-600 text-white p-2 rounded-md mr-2"
                    >
                        Commit
                    </button>
                    <button
                        onClick={handlePull}
                        className="bg-gray-600 text-white p-2 rounded-md mr-2"
                    >
                        Pull
                    </button>

                    <button
                        onClick={handlePush}
                        className="bg-gray-600 text-white p-2 rounded-md"
                    >
                        Push
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Git;
