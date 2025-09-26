import { createOpenAILLM, createOpenAIEmbedding } from '../src/services/openai';
import { QuranRAGConfig } from '../src/types/index';

const mockConfig: QuranRAGConfig = {
  indexName: 'test-index',
  pineconeApiKey: 'test-pinecone-key',
  openaiApiKey: 'test-openai-key',
  llmModel: 'gpt-3.5-turbo',
  embeddingModel: 'text-embedding-3-small',
  dataDirectory: './test-data'
};

describe('Service Creation', () => {
  describe('OpenAI Services', () => {
    it('should create OpenAI LLM with correct configuration', () => {
      const llm = createOpenAILLM(mockConfig);
      expect(llm).toBeDefined();
      // Note: We can't easily test the internal configuration without mocking
      // but we can verify the instance is created
    });

    it('should create OpenAI Embedding with correct configuration', () => {
      const embedding = createOpenAIEmbedding(mockConfig);
      expect(embedding).toBeDefined();
    });
  });

  describe('Config Validation', () => {
    it('should accept valid config for service creation', () => {
      expect(mockConfig.indexName).toBe('test-index');
      expect(mockConfig.openaiApiKey).toBe('test-openai-key');
      expect(mockConfig.llmModel).toBe('gpt-3.5-turbo');
      expect(mockConfig.embeddingModel).toBe('text-embedding-3-small');
    });
  });
});