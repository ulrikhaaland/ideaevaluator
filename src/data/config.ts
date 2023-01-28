import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);
