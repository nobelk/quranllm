# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QuranLLM is an LLM-powered Q&A service for Al-Quran using RAG (Retrieval-Augmented Generation). It combines LlamaIndex, Pinecone vector database, and OpenAI or Ollama to provide intelligent answers about Quran content.

## Development Commands

```bash
# Build the TypeScript project
npm run build

# Run example (requires build first)
npm run example

# Development example (no build required)
npm run dev:example

# Watch mode for development
npm run watch

# Code quality
npm run lint
npm run lint:fix
npm run format
npm run format:check

# Testing
npm test
npm run test:watch
npm run test:coverage

# Clean build artifacts
npm run clean
```

## Architecture

### Core Structure
- **src/index.ts**: Main entry point, exports all public APIs
- **src/core/**: Core RAG functionality
  - `index.ts`: Index loading logic
  - `query.ts`: Query processing pipeline
  - `rag.ts`: RAG agent implementation with custom prompting
- **src/services/**: External service integrations
  - `openai.ts`: OpenAI LLM and embedding models
  - `ollama.ts`: Ollama LLM and embedding models
  - `pinecone.ts`: Pinecone vector store operations
  - `reader.ts`: Document loading utilities
- **src/utils/config.ts**: Configuration management with environment variables
- **src/types/index.ts**: TypeScript type definitions

### Key Design Patterns
- **Two-stage RAG Pipeline**:
  1. `queryData()` retrieves relevant document chunks from Pinecone
  2. `runRAGquery()` generates answers using retrieved context
- **Multi-provider Support**: Supports both OpenAI and Ollama as LLM providers
- **Configuration-driven**: All settings managed through `QuranRAGConfig` interface with provider-based initialization

### Path Mapping
Uses TypeScript path mapping with `@/` prefix:
- `@/core/*` → `src/core/*`
- `@/services/*` → `src/services/*`
- `@/types/*` → `src/types/*`
- `@/utils/*` → `src/utils/*`

## Environment Setup

Required environment variables depend on the provider:

**For OpenAI (default)**:
```env
PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
```

**For Ollama**:
```env
PROVIDER=ollama
PINECONE_API_KEY=your-pinecone-api-key
```

Optional overrides:
```env
INDEX_NAME=quranllm-spike
LLM_MODEL=gpt-4.1-nano  # For OpenAI, or llama3:latest for Ollama
EMBEDDING_MODEL=text-embedding-3-small  # For OpenAI, or nomic-embed-text for Ollama
DATA_DIRECTORY=./data
OLLAMA_BASE_URL=http://localhost:11434  # Only for Ollama provider
```

## Testing

Uses Jest with ESM support:
- Test files in `tests/` directory
- Uses `ts-jest` with ESM preset
- Coverage reports in `coverage/` directory
- Run single tests: `npm test -- --testPathPattern=filename`

## Dependencies

Key dependencies:
- **llamaindex**: Main RAG framework
- **@llamaindex/openai**: OpenAI integration
- **@llamaindex/ollama**: Ollama integration
- **@llamaindex/pinecone**: Pinecone vector store
- **@llamaindex/readers**: Document readers
- **zod**: Runtime type validation
- **dotenv**: Environment variable management
- **yocto-spinner**: CLI spinner for user experience