export interface Project {
    name: string;
    path: string;
    language: string;
}

export const fetchProject: React.FC<Project> = async ({ project }): Promise<Project> => {
    const apiUrl = "http://localhost:8080/api/open/project";
    const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "path": project.path
        }),
    });
    if (!resp.ok) {
        throw new Error('Failed to open/create project');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await resp.json();
    return data.map((todo: Todo) => ({id: todo.id, title: todo.title})).slice(0, 5);
}
