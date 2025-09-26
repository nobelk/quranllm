import { getConfig } from '../src/utils/config';

describe('Configuration', () => {
  it('should return default config when no environment variables are set', () => {
    // Clear environment variables for this test
    const originalEnv = process.env;
    process.env = {};

    const config = getConfig();

    expect(config).toEqual({
      indexName: 'quranllm-spike',
      pineconeApiKey: undefined,
      openaiApiKey: undefined,
      llmModel: 'gpt-4.1-nano',
      embeddingModel: 'text-embedding-ada-002',
      dataDirectory: './data'
    });

    // Restore environment
    process.env = originalEnv;
  });

  it('should use environment variables when provided', () => {
    const originalEnv = process.env;
    process.env = {
      ...process.env,
      PINECONE_API_KEY: 'test-pinecone-key',
      OPENAI_API_KEY: 'test-openai-key',
      INDEX_NAME: 'test-index',
      LLM_MODEL: 'gpt-3.5-turbo',
      EMBEDDING_MODEL: 'text-embedding-3-small',
      DATA_DIRECTORY: './test-data'
    };

    const config = getConfig();

    expect(config.pineconeApiKey).toBe('test-pinecone-key');
    expect(config.openaiApiKey).toBe('test-openai-key');
    expect(config.indexName).toBe('test-index');
    expect(config.llmModel).toBe('gpt-3.5-turbo');
    expect(config.embeddingModel).toBe('text-embedding-3-small');
    expect(config.dataDirectory).toBe('./test-data');

    // Restore environment
    process.env = originalEnv;
  });

  it('should have required config structure', () => {
    const config = getConfig();

    expect(config).toHaveProperty('indexName');
    expect(config).toHaveProperty('pineconeApiKey');
    expect(config).toHaveProperty('openaiApiKey');
    expect(config).toHaveProperty('llmModel');
    expect(config).toHaveProperty('embeddingModel');
    expect(config).toHaveProperty('dataDirectory');
  });
});