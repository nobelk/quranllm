import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { QuranRAGConfig } from "../types";

export function createOpenAILLM(config: QuranRAGConfig): OpenAI {
  return new OpenAI({
    apiKey: config.openaiApiKey,
    model: config.llmModel,
  });
}

export function createOpenAIEmbedding(config: QuranRAGConfig): OpenAIEmbedding {
  return new OpenAIEmbedding({
    apiKey: config.openaiApiKey,
    model: config.embeddingModel,
  });
}