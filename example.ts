import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import {
    Settings,
    VectorStoreIndex,
    storageContextFromDefaults,
} from "llamaindex"
import 'dotenv/config'

import { PineconeVectorStore } from '@llamaindex/pinecone';


async function loadAndIndexData() {
    const indexName = "quranllm-spike"; // Replace with your index name

    const vectorStore = new PineconeVectorStore({
        indexName,
        apiKey: process.env.PINECONE_API_KEY as string,
    });

    const documents = await new SimpleDirectoryReader().loadData({ directoryPath: './data' });

    const storageContext = await storageContextFromDefaults({ vectorStore });
    const index = await VectorStoreIndex.fromDocuments(documents, { storageContext });

    return index;
}


async function queryData(index: VectorStoreIndex, query: string) {
    const retriever = index.asRetriever();
    const nodes = await retriever.retrieve(query);
    // Process retrieved nodes for RAG or other applications
    console.log(nodes);
}

async function main() {
    // the rest of your code goes here
    // set LLM and the embedding model
    Settings.llm = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-4o",
    })
    Settings.embedModel = new OpenAIEmbedding({
        apiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-ada-002",
    })

    // set up logging
    Settings.callbackManager.on("llm-tool-call", (event) => {
        console.log(event.detail)
    })
    Settings.callbackManager.on("llm-tool-result", (event) => {
        console.log(event.detail)
    })

    const index = await loadAndIndexData();
    await queryData(index, "What is the first verse of alfatiha?")
}


main().catch(console.error);