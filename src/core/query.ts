import { VectorStoreIndex } from "llamaindex";
import { ragAgent } from "./rag";

export async function queryData(index: VectorStoreIndex, query: string): Promise<string> {
  const retriever = index.asRetriever();
  const nodes = await retriever.retrieve(query);

  const answer = await ragAgent({ nodes, query });
  return answer;
}