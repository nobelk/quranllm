import { VectorStoreIndex } from "llamaindex";
import { NodeWithScore } from "@llamaindex/core/schema";
import { BaseVectorStore } from "@llamaindex/core/vector-store";

export type LLMProvider = "openai" | "ollama";

export interface QuranRAGConfig {
  indexName: string;
  pineconeApiKey: string;
  provider: LLMProvider;
  openaiApiKey?: string;
  llmModel: string;
  embeddingModel: string;
  dataDirectory: string;
  ollamaBaseUrl?: string;
}

export interface QueryResult {
  query: string;
  answer: string;
  nodes: NodeWithScore[];
}

export interface IndexingOptions {
  shouldIndex: boolean;
  vectorStore?: BaseVectorStore;
}

export interface RAGoptions {
  nodes: NodeWithScore[];
  query: string;
}

export interface QuranService {
  loadAndIndexData(options: IndexingOptions): Promise<VectorStoreIndex>;
  queryData(index: VectorStoreIndex, query: string): Promise<string>;
}
