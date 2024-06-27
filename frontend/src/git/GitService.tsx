interface GitStatusResponse {
    untrackedFiles: Set<string>;
    addedFiles: Set<string>;
    modifiedFiles: Set<string>;
    uncommittedFiles: Set<string>;
}

export const fetchGitResponse = async (): Promise<string[][]> => {
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
                "project": "epita-ing-2026-tui-julie.ducastel"
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

export const commitChanges = async (message: string): Promise<void> => {
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
                "project": "epita-ing-2026-tui-julie.ducastel"
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to commit changes');
        }
    } catch (error) {
        throw new Error('Failed to commit changes');
    }
};

export const pushChanges = async (): Promise<void> => {
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
                "project": "epita-ing-2026-tui-julie.ducastel"
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to push changes');
        }
    } catch (error) {
        throw new Error('Failed to push changes');
    }
};

export const fetchPull = async (): Promise<void> => {
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
                "project": "epita-ing-2026-tui-julie.ducastel"
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to push changes');
        }
    } catch (error) {
        throw new Error('Failed to push changes');
    }
};