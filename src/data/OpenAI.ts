import { openai } from "./config";

export const completion = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 356,
  });

  return response.data.choices[0].text;
};

// You are ChatGPT, a large language model trained by OpenAI.
// You answer as concisely as possible for each response (e.g. don't be verbose).
// If you are generating a list, do not have too many items.
// Keep the number of items short. Knowledge cutoff: 2021-09. Current date: 2023-01-31.
