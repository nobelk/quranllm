# QuranLLM
[![CI](https://github.com/nobelk/quranllm/actions/workflows/ci.yml/badge.svg)](https://github.com/nobelk/quranllm/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/nobelk/quranllm/branch/main/graph/badge.svg?token=YOUR_TOKEN)](https://codecov.io/gh/nobelk/quranllm)
[![Node.js 18+](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

LLM-powered Q&A service for Al-Quran using RAG (Retrieval-Augmented Generation) with LlamaIndex, Pinecone, and OpenAI or Ollama.

## Installation

```bash
npm install quranllm
```

## Prerequisites

1. **LLM Provider**: Choose one of the following:
   - **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)
   - **Ollama**: Run locally using Docker (see [Running Ollama Locally](#running-ollama-locally-using-docker))
2. **Pinecone API Key**: Get from [Pinecone Console](https://app.pinecone.io/)
3. **Quran Data**: Place Quran text files in a `./data` directory (plain text format)

## Usage

### Basic Usage

```typescript
import { loadIndex, queryData, getConfig, initializeSettings } from 'quranllm';
import yoctoSpinner from 'yocto-spinner';

async function main() {
  // Initialize configuration
  const config = getConfig();
  initializeSettings(config);

  // Load existing index from Pinecone
  const index = await loadIndex(config);

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

#### Using OpenAI (Default)

Create a `.env` file with your OpenAI API key:

```env
PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key

# Optional overrides (these are defaults for OpenAI)
INDEX_NAME=quranllm-spike
LLM_MODEL=gpt-4.1-nano
EMBEDDING_MODEL=text-embedding-3-small
DATA_DIRECTORY=./data
```

#### Using Ollama (Local)

Create a `.env` file for Ollama:

```env
PROVIDER=ollama
PINECONE_API_KEY=your-pinecone-api-key

# Optional overrides (these are defaults for Ollama)
OLLAMA_BASE_URL=http://localhost:11434
LLM_MODEL=llama3:latest
EMBEDDING_MODEL=nomic-embed-text
INDEX_NAME=quranllm-spike
DATA_DIRECTORY=./data
```

### Advanced Usage

```typescript
import {
  QuranRAGConfig,
  loadIndex,
  queryData
} from 'quranllm';

// Example with OpenAI
const configOpenAI: QuranRAGConfig = {
  indexName: "my-quran-index",
  pineconeApiKey: process.env.PINECONE_API_KEY!,
  provider: "openai",
  openaiApiKey: process.env.OPENAI_API_KEY!,
  llmModel: "gpt-4o",
  embeddingModel: "text-embedding-3-small",
  dataDirectory: "./my-data"
};

// Example with Ollama
const configOllama: QuranRAGConfig = {
  indexName: "my-quran-index",
  pineconeApiKey: process.env.PINECONE_API_KEY!,
  provider: "ollama",
  llmModel: "llama3:latest",
  embeddingModel: "nomic-embed-text",
  dataDirectory: "./my-data",
  ollamaBaseUrl: "http://localhost:11434"
};

// Load existing index from Pinecone
const index = await loadIndex(configOpenAI); // or configOllama
const result = await queryData(index, "Which path do we seek according to al-fatiha?");
```

### Using Individual Services

```typescript
import {
  createOpenAILLM,
  createOpenAIEmbedding,
  createOllamaLLM,
  createOllamaEmbedding,
  createPineconeVectorStore,
  loadDocuments,
  getConfig
} from 'quranllm';

const config = getConfig();

// Create individual services based on provider
if (config.provider === 'openai') {
  const llm = createOpenAILLM(config);
  const embedding = createOpenAIEmbedding(config);
} else if (config.provider === 'ollama') {
  const llm = createOllamaLLM(config);
  const embedding = createOllamaEmbedding(config);
}

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
# Using OpenAI (requires OPENAI_API_KEY in .env)
PROVIDER=openai npm run dev:example

# Using Ollama (requires Ollama running locally)
PROVIDER=ollama npm run dev:example

# Build and run
npm run build
npm run example
```

### Code quality:

```bash
npm run lint
npm run format
npm test
```

## API Reference

### Core Functions

#### `loadIndex(config: QuranRAGConfig): Promise<VectorStoreIndex>`
Load existing Pinecone index for querying.

#### `queryData(index: VectorStoreIndex, query: string): Promise<string>`
Query the indexed data and get an AI-powered answer about the Quran.

#### `getConfig(): QuranRAGConfig`
Get configuration from environment variables with sensible defaults.

#### `initializeSettings(config: QuranRAGConfig): void`
Initialize LlamaIndex global settings with OpenAI or Ollama LLM and embedding models based on the provider.

### Service Functions

#### `createOpenAILLM(config: QuranRAGConfig): OpenAI`
Create an OpenAI LLM instance for text generation.

#### `createOpenAIEmbedding(config: QuranRAGConfig): OpenAIEmbedding`
Create an OpenAI embedding model instance.

#### `createOllamaLLM(config: QuranRAGConfig): Ollama`
Create an Ollama LLM instance for text generation.

#### `createOllamaEmbedding(config: QuranRAGConfig): OllamaEmbedding`
Create an Ollama embedding model instance.

#### `createPineconeVectorStore(config: QuranRAGConfig): PineconeVectorStore`
Create a Pinecone vector store instance.

#### `loadDocuments(config: QuranRAGConfig): Promise<Document[]>`
Load documents from the configured data directory.

### Types

#### `QuranRAGConfig`
```typescript
type LLMProvider = "openai" | "ollama";

interface QuranRAGConfig {
  indexName: string;           // Pinecone index name
  pineconeApiKey: string;      // Pinecone API key
  provider: LLMProvider;       // LLM provider: "openai" or "ollama"
  openaiApiKey?: string;       // OpenAI API key (required if provider is "openai")
  llmModel: string;            // Model for text generation
  embeddingModel: string;      // Model for embeddings
  dataDirectory: string;       // Directory containing Quran text files
  ollamaBaseUrl?: string;      // Ollama base URL (default: "http://localhost:11434")
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

#### `RAGoptions`
```typescript
interface RAGoptions {
  nodes: any[];               // Retrieved document nodes
  query: string;              // User query
}
```

#### `QuranService`
```typescript
interface QuranService {
  loadIndex(config: QuranRAGConfig): Promise<VectorStoreIndex>;
  queryData(index: VectorStoreIndex, query: string): Promise<string>;
}
```

## Running Ollama Locally Using Docker

### Setup Ollama with Docker

```bash
# Run Ollama container
docker run -d --env OLLAMA_HOST=0.0.0.0:11434 -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Pull required models
docker exec -it ollama ollama pull llama3:latest
docker exec -it ollama ollama pull nomic-embed-text

# Optional: Pull additional models
docker exec -it ollama ollama pull tinyllama
```

### Verify Ollama Installation

Test the Ollama installation with a simple query:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3:latest",
  "prompt": "What is the capital of France?",
  "stream": false
}'
```

### Test with RAG-style Context

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3:latest",
  "prompt": "You are answering questions based on retrieved documents. Use only the information provided.\\n\\n=== Retrieved Context ===\\n[Score: 0.92] Al-Fatiha is the first chapter of the Quran.\\n\\n[Score: 0.88] It consists of seven verses.\\n\\n[Score: 0.75] Al-Fatiha is recited in every unit of the Muslim prayer.\\n\\n=== Question ===\\nWhat is Al-Fatiha?\\n\\n=== Answer ===",
  "stream": false,
  "options": {
    "temperature": 0.3,
    "top_p": 0.9
  }
}'
```

### Using QuranLLM with Ollama

Once Ollama is running, use QuranLLM with the Ollama provider:

```bash
# Set environment variables
export PROVIDER=ollama
export OLLAMA_BASE_URL=http://localhost:11434
export PINECONE_API_KEY=your-pinecone-api-key

# Run the example
npm run dev:example
```




## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

Apache-2.0 - see LICENSE file for details.