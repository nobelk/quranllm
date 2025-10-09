import { Ollama, OllamaEmbedding } from "@llamaindex/ollama";
import { QuranRAGConfig } from "../types/index.js";

export function createOllamaLLM(config: QuranRAGConfig): Ollama {
  if (config.ollamaBaseUrl) {
    return new Ollama({
      model: config.llmModel,
      config: {
        host: config.ollamaBaseUrl,
      },
    });
  }
  return new Ollama({
    model: config.llmModel,
  });
}

export function createOllamaEmbedding(config: QuranRAGConfig): OllamaEmbedding {
  if (config.ollamaBaseUrl) {
    return new OllamaEmbedding({
      model: config.embeddingModel,
      config: {
        host: config.ollamaBaseUrl,
      },
    });
  }
  return new OllamaEmbedding({
    model: config.embeddingModel,
  });
}
