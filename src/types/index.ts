import { VectorStoreIndex } from "llamaindex";

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
  nodes: any[];
}

export interface IndexingOptions {
  shouldIndex: boolean;
  vectorStore?: any;
}

export interface RAGoptions {
  nodes: any[];
  query: string;
}

export interface QuranService {
  loadAndIndexData(options: IndexingOptions): Promise<VectorStoreIndex>;
  queryData(index: VectorStoreIndex, query: string): Promise<string>;
}
