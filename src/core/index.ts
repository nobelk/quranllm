import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { VectorStoreIndex, storageContextFromDefaults } from "llamaindex";
import { PineconeVectorStore } from "@llamaindex/pinecone";
import { QuranRAGConfig, IndexingOptions } from "../types/index.js";

export async function loadIndex(
  config: QuranRAGConfig,
): Promise<VectorStoreIndex> {
  const vectorStore = new PineconeVectorStore({
    indexName: config.indexName,
    apiKey: config.pineconeApiKey,
  });

  let index: VectorStoreIndex;

  index = await VectorStoreIndex.fromVectorStore(vectorStore);
  return index;
}
