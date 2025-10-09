import { VectorStoreIndex } from "llamaindex";
import { runRAGquery } from "./rag.js";

export async function queryData(
  index: VectorStoreIndex,
  query: string,
): Promise<string> {
  const retriever = index.asRetriever();
  const nodes = await retriever.retrieve(query);

  const answer = await runRAGquery({ nodes, query });
  return answer;
}
