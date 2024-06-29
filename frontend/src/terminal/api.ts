interface runResponse {
  content: string;
}

export const fetchRunResponse = async (
  name: string,
  language: string
): Promise<string> => {
    const apiUrl = "http://localhost:8080/api/execFeature";
    const feature = language === "JAVA" ? "RUN" : "MAKE";
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                feature: feature,
                params: [],
                project: name,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch response");
        }

        const data: runResponse = await response.json();
        return data.content;
    } catch (error) {
        throw new Error("Failed to fetch response");
    }
};

