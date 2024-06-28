interface GitStatusResponse {
    untrackedFiles: Set<string>;
    addedFiles: Set<string>;
    modifiedFiles: Set<string>;
    uncommittedFiles: Set<string>;
}

export const fetchGitResponse = async (name: string): Promise<string[][]> => {
    const apiUrl = 'http://localhost:8080/api/execFeature';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feature": "STATUS",
                "params": [],
                "project": name 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data: GitStatusResponse = await response.json();

        const untracked = Array.from(data.untrackedFiles);
        const added = Array.from(data.addedFiles);
        const changed = Array.from(data.modifiedFiles);
        const uncommited = Array.from(data.uncommittedFiles);

        return [untracked, added, changed, uncommited];

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};

export const commitChanges = async (message: string, name: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/execFeature';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feature": "COMMIT",
                "params": [message],
                "project": name 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to commit changes');
        }
    } catch (error) {
        throw new Error('Failed to commit changes');
    }
};

export const pushChanges = async (name: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/execFeature';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feature": "PUSH",
                "params": [],
                "project": name
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to push changes');
        }
    } catch (error) {
        throw new Error('Failed to push changes');
    }
};

export const fetchPull = async (name: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/execFeature';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "feature": "PULL",
                "params": [],
                "project": name 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to push changes');
        }
    } catch (error) {
        throw new Error('Failed to push changes');
    }
};