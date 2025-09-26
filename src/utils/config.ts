import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { Settings } from "llamaindex";
import "dotenv/config";
import { QuranRAGConfig } from "../types/index.js";

export function getConfig(): QuranRAGConfig {
  return {
    indexName: process.env.INDEX_NAME || "quranllm-spike",
    pineconeApiKey: process.env.PINECONE_API_KEY as string,
    openaiApiKey: process.env.OPENAI_API_KEY as string,
    llmModel: process.env.LLM_MODEL || "gpt-4.1-nano",
    embeddingModel: process.env.EMBEDDING_MODEL || "text-embedding-ada-002",
    dataDirectory: process.env.DATA_DIRECTORY || "./data",
  };
}

export function initializeSettings(config: QuranRAGConfig): void {
  Settings.llm = new OpenAI({
    apiKey: config.openaiApiKey,
    model: config.llmModel,
  });

  Settings.embedModel = new OpenAIEmbedding({
    apiKey: config.openaiApiKey,
    model: config.embeddingModel,
  });

  Settings.callbackManager.on("llm-tool-call", (event) => {
    console.log(event.detail);
  });

  Settings.callbackManager.on("llm-tool-result", (event) => {
    console.log(event.detail);
  });
}
