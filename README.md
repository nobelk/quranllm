# QuranLLM

[![Node.js 18+](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

LLM-powered Q&A service for Al-Quran using RAG (Retrieval-Augmented Generation) with LlamaIndex, Pinecone, and OpenAI.

## Installation

```bash
npm install quranllm
```

## Prerequisites

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)
2. **Pinecone API Key**: Get from [Pinecone Console](https://app.pinecone.io/)
3. **Quran Data**: Place Quran text files in a `./data` directory (plain text format)

## Usage

### Basic Usage

```typescript
import { loadAndIndexData, queryData, getConfig, initializeSettings } from 'quranllm';
import yoctoSpinner from 'yocto-spinner';

async function main() {
  // Initialize configuration
  const config = getConfig();
  initializeSettings(config);

  // Load and index data (or connect to existing index)
  const index = await loadAndIndexData(config, { shouldIndex: false });

  // Query the Quran with spinner for better UX
  let query = "What is the first verse of al-fatiha?";
  console.log("Question: " + query);
  let spinner = yoctoSpinner({text: "Answer: "}).start();
  let answer = await queryData(index, query);
  spinner.success(answer);

  // Ask another question
  query = "Which path do we seek according to al-fatiha?";
  console.log("Question: " + query);
  spinner = yoctoSpinner({text: "Answer: "}).start();
  answer = await queryData(index, query);
  spinner.success(answer);
}

main().catch(console.error);
```

### Environment Configuration

Create a `.env` file with your API keys:

```env
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
# Optional overrides (these are defaults)
INDEX_NAME=quranllm-spike
LLM_MODEL=gpt-4.1-nano
EMBEDDING_MODEL=text-embedding-ada-002
DATA_DIRECTORY=./data
```

### Advanced Usage

```typescript
import {
  QuranRAGConfig,
  IndexingOptions,
  loadAndIndexData,
  queryData
} from 'quranllm';

const config: QuranRAGConfig = {
  indexName: "my-quran-index",
  pineconeApiKey: process.env.PINECONE_API_KEY!,
  openaiApiKey: process.env.OPENAI_API_KEY!,
  llmModel: "gpt-4o",
  embeddingModel: "text-embedding-3-small",
  dataDirectory: "./my-data"
};

const options: IndexingOptions = {
  shouldIndex: true // Set to true to index new documents
};

const index = await loadAndIndexData(config, options);
const result = await queryData(index, "Which path do we seek according to al-fatiha?");
```

### Using Individual Services

```typescript
import {
  createOpenAILLM,
  createOpenAIEmbedding,
  createPineconeVectorStore,
  loadDocuments,
  getConfig
} from 'quranllm';

const config = getConfig();

// Create individual services
const llm = createOpenAILLM(config);
const embedding = createOpenAIEmbedding(config);
const vectorStore = createPineconeVectorStore(config);
const documents = await loadDocuments(config);
```

## Development

### Build the package:

```bash
npm run build
```

### Run the example:

```bash
npm run example
# or for development
npm run dev:example
```

### Code quality:

```bash
npm run lint
npm run format
npm test
```

## API Reference

### Core Functions

#### `loadAndIndexData(config: QuranRAGConfig, options: IndexingOptions): Promise<VectorStoreIndex>`
Load and index Quran data or connect to existing Pinecone index.

#### `queryData(index: VectorStoreIndex, query: string): Promise<string>`
Query the indexed data and get an AI-powered answer about the Quran.

#### `getConfig(): QuranRAGConfig`
Get configuration from environment variables with sensible defaults.

#### `initializeSettings(config: QuranRAGConfig): void`
Initialize LlamaIndex global settings with OpenAI LLM and embedding models.

### Service Functions

#### `createOpenAILLM(config: QuranRAGConfig): OpenAI`
Create an OpenAI LLM instance for text generation.

#### `createOpenAIEmbedding(config: QuranRAGConfig): OpenAIEmbedding`
Create an OpenAI embedding model instance.

#### `createPineconeVectorStore(config: QuranRAGConfig): PineconeVectorStore`
Create a Pinecone vector store instance.

#### `loadDocuments(config: QuranRAGConfig): Promise<Document[]>`
Load documents from the configured data directory.

### Types

#### `QuranRAGConfig`
```typescript
interface QuranRAGConfig {
  indexName: string;           // Pinecone index name
  pineconeApiKey: string;      // Pinecone API key
  openaiApiKey: string;        // OpenAI API key
  llmModel: string;            // OpenAI model for text generation
  embeddingModel: string;      // OpenAI model for embeddings
  dataDirectory: string;       // Directory containing Quran text files
}
```

#### `IndexingOptions`
```typescript
interface IndexingOptions {
  shouldIndex: boolean;        // Whether to index new documents
  vectorStore?: any;           // Optional custom vector store
}
```

#### `QueryResult`
```typescript
interface QueryResult {
  query: string;              // User query
  answer: string;             // AI-generated answer
  nodes: any[];              // Retrieved document nodes used for answer
}
```

#### `RAGAgentOptions`
```typescript
interface RAGAgentOptions {
  nodes: any[];               // Retrieved document nodes
  query: string;              // User query
}
```

#### `QuranService`
```typescript
interface QuranService {
  loadAndIndexData(options: IndexingOptions): Promise<VectorStoreIndex>;
  queryData(index: VectorStoreIndex, query: string): Promise<string>;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

Apache-2.0 - see LICENSE file for details.