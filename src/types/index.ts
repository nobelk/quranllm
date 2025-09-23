import { VectorStoreIndex } from "llamaindex";

export interface QuranRAGConfig {
  indexName: string;
  pineconeApiKey: string;
  openaiApiKey: string;
  llmModel: string;
  embeddingModel: string;
  dataDirectory: string;
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

export interface RAGAgentOptions {
  nodes: any[];
  query: string;
}

export interface QuranService {
  loadAndIndexData(options: IndexingOptions): Promise<VectorStoreIndex>;
  queryData(index: VectorStoreIndex, query: string): Promise<string>;
}