import { Settings } from "llamaindex";
import { RAGAgentOptions } from "../types/index.js";

export async function ragAgent(options: RAGAgentOptions): Promise<string> {
  const context = options.nodes.map((node) => node.node.text).join("\n\n");

  const prompt = `Based on the following context from the Quran, please answer the user's question accurately and comprehensively.
    Context: ${context}
    Question: ${options.query}
    Please provide the answer based only on the information provided in the context above. Do not include any additional information from outside the context.`;

  const response = await Settings.llm.complete({ prompt });
  return response.text;
}
