import { LLMProvider, OpenAIProvider, AnthropicProvider } from './providers';

export class LLMGateway {
  private providers: Map<string, LLMProvider> = new Map();
  private defaultProvider: string = 'openai';
  private fallbackProvider: string = 'anthropic';

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.addProvider(new OpenAIProvider(process.env.OPENAI_API_KEY));
    }
    if (process.env.ANTHROPIC_API_KEY) {
      this.addProvider(new AnthropicProvider(process.env.ANTHROPIC_API_KEY));
    }
  }

  addProvider(provider: LLMProvider) {
    this.providers.set(provider.name, provider);
  }

  async call(prompt: string, providerName?: string, options?: any): Promise<string> {
    const targetProvider = providerName || this.defaultProvider;
    const provider = this.providers.get(targetProvider);
    
    if (!provider) {
      throw new Error(`Provider ${targetProvider} not found`);
    }

    try {
      console.log(`Calling ${provider.name} with prompt: ${prompt.substring(0, 100)}...`);
      const result = await provider.call(prompt, options);
      console.log(`${provider.name} response: ${result.substring(0, 100)}...`);
      return result;
    } catch (error) {
      console.error(`LLM call failed for ${provider.name}:`, error);
      
      // Try fallback provider
      if (targetProvider !== this.fallbackProvider && this.providers.has(this.fallbackProvider)) {
        console.log(`Falling back to ${this.fallbackProvider}`);
        return this.call(prompt, this.fallbackProvider, options);
      }
      
      throw error;
    }
  }

  async generateWorkflow(description: string): Promise<any> {
    const prompt = `
Generate a workflow definition based on this description: "${description}"

Return a JSON object with this structure:
{
  "steps": [
    {
      "id": "step1",
      "type": "trigger",
      "name": "Start",
      "config": {}
    },
    {
      "id": "step2", 
      "type": "ai",
      "name": "AI Task",
      "config": {
        "prompt": "Generated prompt based on description",
        "model": "gpt-3.5-turbo"
      }
    }
  ],
  "connections": [
    {"from": "step1", "to": "step2"}
  ]
}

Only return valid JSON, no other text.`;

    const response = await this.call(prompt);
    try {
      return JSON.parse(response);
    } catch {
      throw new Error('Failed to parse workflow JSON from LLM response');
    }
  }
}

// Export singleton instance
export const llmGateway = new LLMGateway();


