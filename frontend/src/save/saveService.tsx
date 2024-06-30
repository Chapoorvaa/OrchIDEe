interface SaveResponse {
    path: string,
    from: number,
    to: number,
    content: string,
}

export const fetchSaveResponse = async (path: string, content: string) => {
    const apiUrl = 'http://localhost:8080/api/update';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "path": path,
                "from": 0,
                "to": content.length,
                "content": content,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data: SaveResponse = await response.json();

        return data;

    } catch (error) {
        throw new Error('Failed to fetch response');
    }
};