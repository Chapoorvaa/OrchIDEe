interface FileResponse {
  content: string;
}

export const fetchOpenFile = async (path: string): Promise<string> => {
  const apiUrl = "http://localhost:8080/api/open/file";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: path,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Response from server is not OK when fetching the content of a file"
      );
    }

    const data: FileResponse = await response.json();
    return data.content;
  } catch (error) {
    throw new Error("Failed to fetch the content of a file");
  }
};
