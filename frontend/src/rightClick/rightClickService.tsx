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