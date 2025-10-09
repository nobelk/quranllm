import { QuranRAGConfig, IndexingOptions, RAGoptions, QueryResult } from '../src/types/index';

describe('Type Definitions', () => {
  describe('QuranRAGConfig', () => {
    it('should accept a valid config object', () => {
      const config: QuranRAGConfig = {
        indexName: 'test-index',
        pineconeApiKey: 'test-key',
        provider: 'openai',
        openaiApiKey: 'test-key',
        llmModel: 'gpt-3.5-turbo',
        embeddingModel: 'text-embedding-3-small',
        dataDirectory: './data'
      };

      expect(config.indexName).toBe('test-index');
      expect(config.pineconeApiKey).toBe('test-key');
      expect(config.openaiApiKey).toBe('test-key');
      expect(config.llmModel).toBe('gpt-3.5-turbo');
      expect(config.embeddingModel).toBe('text-embedding-3-small');
      expect(config.dataDirectory).toBe('./data');
    });
  });

  describe('IndexingOptions', () => {
    it('should accept valid indexing options', () => {
      const options: IndexingOptions = {
        shouldIndex: true
      };

      expect(options.shouldIndex).toBe(true);
    });

    it('should work without optional vectorStore', () => {
      const options: IndexingOptions = {
        shouldIndex: false
      };

      expect(options.shouldIndex).toBe(false);
      expect(options.vectorStore).toBeUndefined();
    });
  });

  describe('RAGAgentOptions', () => {
    it('should accept valid RAG agent options', () => {
      const options: RAGoptions = {
        nodes: [],
        query: 'test query'
      };

      expect(options.nodes).toEqual([]);
      expect(options.query).toBe('test query');
    });
  });

  describe('QueryResult', () => {
    it('should accept valid query result', () => {
      const result: QueryResult = {
        query: 'test query',
        answer: 'test answer',
        nodes: []
      };

      expect(result.query).toBe('test query');
      expect(result.answer).toBe('test answer');
      expect(result.nodes).toEqual([]);
    });
  });
});