interface FileTreeResponse {
    json: string;
  }


export const buildFileTree = async (rootPath: string): Promise<string> => {
    const apiUrl = 'http://localhost:8080/api/filetree';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": rootPath
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data: FileTreeResponse = await response.json();
        return JSON.parse(data.json);

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
}

export const createFile = async (userInput: string, path: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/create/file';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": path + userInput
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};

export const createFolder = async (userInput: string, path: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/create/folder';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": path + userInput
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};

export const renameFileorFolder = async (userInput: string, pathToRename : string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/rename';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": pathToRename,
                "newName" : userInput
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};


export const deleteFileorFolder = async (pathToDelete: string): Promise<void> => {
    const apiUrl = 'http://localhost:8080/api/delete';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": pathToDelete
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};