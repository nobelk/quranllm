describe('Package Structure', () => {
  it('should have valid package.json', () => {
    const packageJson = require('../package.json');

    expect(packageJson.name).toBe('quranllm');
    expect(packageJson.version).toBe('0.1.0');
    expect(packageJson.main).toBe('dist/index.js');
    expect(packageJson.types).toBe('dist/index.d.ts');
  });

  it('should have correct dependencies', () => {
    const packageJson = require('../package.json');

    // Check for key dependencies
    expect(packageJson.dependencies).toHaveProperty('llamaindex');
    expect(packageJson.dependencies).toHaveProperty('@llamaindex/openai');
    expect(packageJson.dependencies).toHaveProperty('@llamaindex/pinecone');
    expect(packageJson.dependencies).toHaveProperty('dotenv');
  });

  it('should have proper scripts configured', () => {
    const packageJson = require('../package.json');

    expect(packageJson.scripts).toHaveProperty('build');
    expect(packageJson.scripts).toHaveProperty('test');
    expect(packageJson.scripts).toHaveProperty('lint');
    expect(packageJson.scripts.build).toBe('tsc');
  });
});