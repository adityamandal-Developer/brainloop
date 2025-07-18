export async function fetchDataInChunks(question: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/ai/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    if (!response.body) throw new Error("No response body");

    return response.body;
  } catch {
    throw new Error("No response body");
  }
}
