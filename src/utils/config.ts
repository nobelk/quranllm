import { Settings } from "llamaindex";
import "dotenv/config";
import { QuranRAGConfig, LLMProvider } from "../types/index.js";
import { createOllamaLLM, createOllamaEmbedding } from "../services/ollama.js";
import { createOpenAILLM, createOpenAIEmbedding } from "../services/openai.js";

export function getConfig(): QuranRAGConfig {
  const provider = (process.env.PROVIDER || "openai") as LLMProvider;

  const config: QuranRAGConfig = {
    indexName: process.env.INDEX_NAME || "quranllm-spike",
    pineconeApiKey: process.env.PINECONE_API_KEY as string,
    provider,
    llmModel: process.env.LLM_MODEL || (provider === "openai" ? "gpt-4.1-nano" : "llama3:latest"),
    embeddingModel: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
    dataDirectory: process.env.DATA_DIRECTORY || "./data",
  };

  if (provider === "openai") {
    config.openaiApiKey = process.env.OPENAI_API_KEY as string;
  } else if (provider === "ollama") {
    config.ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434/api/generate";
  } else {
      throw new Error("No provider provided");
  }

  return config;
}

export function initializeSettings(config: QuranRAGConfig): void {
  if (config.provider === "ollama") {
    Settings.llm = createOllamaLLM(config);
    Settings.embedModel = createOllamaEmbedding(config);
  } else if (config.provider === "openai") {
    Settings.llm = createOpenAILLM(config);
    Settings.embedModel = createOpenAIEmbedding(config);
  } else {
      throw new Error("No provider provided");
  }

  Settings.callbackManager.on("llm-tool-call", (event) => {
    console.log(event.detail);
  });

  Settings.callbackManager.on("llm-tool-result", (event) => {
    console.log(event.detail);
  });
}
