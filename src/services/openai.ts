import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { QuranRAGConfig } from "../types/index.js";

export function createOpenAILLM(config: QuranRAGConfig): OpenAI {
  if (!config.openaiApiKey) {
    throw new Error("OpenAI API key is required when using OpenAI provider");
  }
  return new OpenAI({
    apiKey: config.openaiApiKey,
    model: config.llmModel,
  });
}

export function createOpenAIEmbedding(config: QuranRAGConfig): OpenAIEmbedding {
  if (!config.openaiApiKey) {
    throw new Error("OpenAI API key is required when using OpenAI provider");
  }
  return new OpenAIEmbedding({
    apiKey: config.openaiApiKey,
    model: config.embeddingModel,
  });
}
