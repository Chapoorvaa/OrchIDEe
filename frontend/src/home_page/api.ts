export interface Project {
    name: string;
    path: string;
}

export const sendProject = async (path: string): Promise<Project> => {
    const apiUrl = "http://localhost:8080/api/open/project";
    console.log(path);
    const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "path": path
        }),
    });
    if (!resp.ok) {
        throw new Error('Failed to open/create project');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const data: Project = await resp.json();

    return data;
}

export const createProject = async (path: string, name: string, language: string): Promise<Project> => {
    const apiUrl = "http://localhost:8080/api/create/project";
    console.log(path);
    const resp = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "path": path,
            "name": name,
            "language": language
        }),
    });
    if (!resp.ok) {
        throw new Error('Failed to open/create project');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const data: Project = await resp.json();

    return data;
}
