import { Settings, MetadataMode } from "llamaindex";
import { RAGoptions } from "../types/index.js";

export async function runRAGquery(options: RAGoptions): Promise<string> {
  const context = options.nodes
    .map((node, index) => {
      const text = node.node.getContent(MetadataMode.NONE);
      const metadata = node.node.metadata || {};
      const score = node.score ? `(relevance: ${node.score.toFixed(3)})` : "";

      // Format metadata for better context
      const metadataStr = Object.keys(metadata).length > 0
        ? `[${Object.entries(metadata)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}]`
        : "";

      return `Source ${index + 1} ${metadataStr} ${score}\n${text}`;
    })
    .join("\n\n");

  const prompt = `Based on the following context from the Quran, please answer the user's question accurately and comprehensively.

Context:
${context}

Question: ${options.query}

Please provide the answer based only on the information provided in the context above. When citing information, reference the source numbers and metadata provided (e.g., Surah, Ayah). Do not include any additional information from outside the context.`;

  const response = await Settings.llm.complete({ prompt });
  return response.text;
}
