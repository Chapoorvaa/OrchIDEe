interface RunResponse {
  output: string;
}

export const fetchRunResponse = async (
  name: string,
  language: string
): Promise<string> => {
  const apiUrl = "http://localhost:8080/api/execFeature";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feature: language === "JAVA" ? "RUN" : "MAKE",
        params: language === "JAVA" ? [] : ["run"],
        project: name,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    const data: RunResponse = await response.json();
    return data.output;
  } catch (error) {
    throw new Error("Failed to fetch response");
  }
};
