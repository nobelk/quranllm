import { PineconeVectorStore } from "@llamaindex/pinecone";
import { QuranRAGConfig } from "@/types";

export function createPineconeVectorStore(
  config: QuranRAGConfig,
): PineconeVectorStore {
  return new PineconeVectorStore({
    indexName: config.indexName,
    apiKey: config.pineconeApiKey,
  });
}
