// Main entry point for QuranLLM package
export { loadIndex } from './core/index.js';
export { queryData } from './core/query.js';
export { createOpenAILLM, createOpenAIEmbedding } from './services/openai.js';
export { createPineconeVectorStore } from './services/pinecone.js';
export { loadDocuments } from './services/reader.js';
export { getConfig, initializeSettings } from './utils/config.js';

// Export types
export type {
  QuranRAGConfig,
  QueryResult,
  IndexingOptions,
  RAGAgentOptions,
  QuranService
} from './types';