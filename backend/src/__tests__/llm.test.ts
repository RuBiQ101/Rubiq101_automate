import { LLMGateway } from '../llm/gateway';

describe('LLM Gateway', () => {
  it('should generate workflow from description', async () => {
    const gateway = new LLMGateway();
    
    // Mock the call method to avoid actual API calls
    jest.spyOn(gateway, 'call').mockResolvedValue(JSON.stringify({
      steps: [
        { id: 'trigger1', type: 'trigger', name: 'Start', config: {} },
        { id: 'ai1', type: 'ai', name: 'Process', config: { prompt: 'test' } }
      ]
    }));

    const result = await gateway.generateWorkflow('Create a simple workflow');
    
    expect(result.steps).toHaveLength(2);
    expect(result.steps[0].type).toBe('trigger');
    expect(result.steps[1].type).toBe('ai');
  });
});
