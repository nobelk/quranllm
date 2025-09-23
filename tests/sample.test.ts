describe('Sample Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  it('should demonstrate async testing', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });
});