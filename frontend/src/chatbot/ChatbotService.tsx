interface BotResponse {
  content: string;
}

export const fetchBotResponse = async (userInput: string, name: string): Promise<string> => {
  const apiUrl = 'http://localhost:8080/api/execFeature';
  const model = "tinyllama";

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "feature":"CHATBOT",
        "params": [model, userInput],
        "project": name
        }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data: BotResponse = await response.json();
    return data.content;
  } catch (error) {
    throw new Error('Failed to fetch response');
  }
};
