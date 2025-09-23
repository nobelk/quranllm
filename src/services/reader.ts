import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { QuranRAGConfig } from "@/types";

export async function loadDocuments(config: QuranRAGConfig) {
  const reader = new SimpleDirectoryReader();
  return await reader.loadData({ directoryPath: config.dataDirectory });
}