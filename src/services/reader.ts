import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import { QuranRAGConfig } from "../types/index.js";

export async function loadDocuments(config: QuranRAGConfig) {
  const reader = new SimpleDirectoryReader();
  return await reader.loadData({ directoryPath: config.dataDirectory });
}