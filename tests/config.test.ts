import { getConfig } from '../src/utils/config';

describe('Configuration', () => {
  it('should return default config with openai provider when no environment variables are set', () => {
    // Clear environment variables for this test
    const originalEnv = process.env;
    process.env = {};

    const config = getConfig();

    expect(config).toEqual({
      indexName: 'quranllm-spike',
      pineconeApiKey: undefined,
      provider: 'openai',
      openaiApiKey: undefined,
      llmModel: 'gpt-4.1-nano',
      embeddingModel: 'text-embedding-3-small',
      dataDirectory: './data'
    });

    // Restore environment
    process.env = originalEnv;
  });

  it('should use environment variables for openai provider', () => {
    const originalEnv = process.env;
    process.env = {
      ...process.env,
      PROVIDER: 'openai',
      PINECONE_API_KEY: 'test-pinecone-key',
      OPENAI_API_KEY: 'test-openai-key',
      INDEX_NAME: 'test-index',
      LLM_MODEL: 'gpt-3.5-turbo',
      EMBEDDING_MODEL: 'text-embedding-3-small',
      DATA_DIRECTORY: './test-data'
    };

    const config = getConfig();

    expect(config.provider).toBe('openai');
    expect(config.pineconeApiKey).toBe('test-pinecone-key');
    expect(config.openaiApiKey).toBe('test-openai-key');
    expect(config.indexName).toBe('test-index');
    expect(config.llmModel).toBe('gpt-3.5-turbo');
    expect(config.embeddingModel).toBe('text-embedding-3-small');
    expect(config.dataDirectory).toBe('./test-data');

    // Restore environment
    process.env = originalEnv;
  });

  it('should configure ollama provider with default settings', () => {
    const originalEnv = process.env;
    process.env = {
      ...process.env,
      PROVIDER: 'ollama',
      PINECONE_API_KEY: 'test-pinecone-key'
    };

    const config = getConfig();

    expect(config.provider).toBe('ollama');
    expect(config.llmModel).toBe('llama3:latest');
    expect(config.ollamaBaseUrl).toBe('http://localhost:11434/api/generate');
    expect(config.openaiApiKey).toBeUndefined();

    // Restore environment
    process.env = originalEnv;
  });

  it('should configure ollama provider with custom base URL', () => {
    const originalEnv = process.env;
    process.env = {
      ...process.env,
      PROVIDER: 'ollama',
      PINECONE_API_KEY: 'test-pinecone-key',
      OLLAMA_BASE_URL: 'http://custom-ollama:8080',
      LLM_MODEL: 'llama2'
    };

    const config = getConfig();

    expect(config.provider).toBe('ollama');
    expect(config.llmModel).toBe('llama2');
    expect(config.ollamaBaseUrl).toBe('http://custom-ollama:8080');

    // Restore environment
    process.env = originalEnv;
  });

  it('should have required config structure', () => {
    const config = getConfig();

    expect(config).toHaveProperty('indexName');
    expect(config).toHaveProperty('pineconeApiKey');
    expect(config).toHaveProperty('provider');
    expect(config).toHaveProperty('llmModel');
    expect(config).toHaveProperty('embeddingModel');
    expect(config).toHaveProperty('dataDirectory');
  });
});