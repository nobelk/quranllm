import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import {
    VectorStoreIndex,
    storageContextFromDefaults,
} from "llamaindex";
import { PineconeVectorStore } from '@llamaindex/pinecone';
import { QuranRAGConfig, IndexingOptions } from "@/types";

export async function loadAndIndexData(
  config: QuranRAGConfig,
  options: IndexingOptions
): Promise<VectorStoreIndex> {
  const vectorStore = new PineconeVectorStore({
    indexName: config.indexName,
    apiKey: config.pineconeApiKey,
  });

  let index: VectorStoreIndex;

  if (options.shouldIndex) {
    const documents = await new SimpleDirectoryReader().loadData({
      directoryPath: config.dataDirectory
    });
    const storageContext = await storageContextFromDefaults({ vectorStore });
    index = await VectorStoreIndex.fromDocuments(documents, { storageContext });
  } else {
    index = await VectorStoreIndex.fromVectorStore(vectorStore);
  }

  return index;
}