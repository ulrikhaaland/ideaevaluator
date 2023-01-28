import { openai } from "./config";

export const completion = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 256,
  });

  return response.data.choices[0].text;
};
