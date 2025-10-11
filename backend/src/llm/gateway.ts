import { LLMProvider, OpenAIProvider, AnthropicProvider } from './providers';
import { cache, cacheKeys } from '../utils/cache';
import { llmMetrics } from '../utils/metrics';
import logger from '../utils/logger';
import crypto from 'crypto';

export class LLMGateway {
  private providers: Map<string, LLMProvider> = new Map();
  private defaultProvider: string = 'openai';
  private fallbackProvider: string = 'anthropic';
  private rateLimiter = new Map<string, { count: number; resetTime: number }>();

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

  private generatePromptHash(prompt: string, options: any = {}): string {
    const content = JSON.stringify({ prompt, options });
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  }

  private async checkRateLimit(provider: string): Promise<boolean> {
    const key = `ratelimit:${provider}`;
    const limit = provider === 'openai' ? 60 : 50; // requests per minute
    const window = 60 * 1000;

    const now = Date.now();
    const limiter = this.rateLimiter.get(key) || { count: 0, resetTime: now + window };

    if (now > limiter.resetTime) {
      limiter.count = 0;
      limiter.resetTime = now + window;
    }

    if (limiter.count >= limit) {
      return false;
    }

    limiter.count++;
    this.rateLimiter.set(key, limiter);
    return true;
  }

  async call(prompt: string, providerName?: string, options?: any): Promise<string> {
    const targetProvider = providerName || this.defaultProvider;
    const provider = this.providers.get(targetProvider);
    
    if (!provider) {
      throw new Error(`Provider ${targetProvider} not found`);
    }

    // Rate limit check
    const canProceed = await this.checkRateLimit(targetProvider);
    if (!canProceed) {
      logger.warn('Rate limit exceeded', { provider: targetProvider });
      throw new Error(`Rate limit exceeded for ${targetProvider}`);
    }

    // Cache hit check
    const promptHash = this.generatePromptHash(prompt, options);
    const cacheKey = cacheKeys.llmResponse(targetProvider, options?.model || 'default', promptHash);
    const cached = await cache.get<string>(cacheKey);
    if (cached) {
      logger.info('Cache hit for LLM request', { provider: targetProvider, promptHash });
      return cached;
    }

    const startTime = llmMetrics.requestStarted(targetProvider, options?.model || 'default');

    try {
      logger.info(`Calling ${provider.name}`, { prompt: prompt.substring(0, 100) + '...', model: options?.model });
      const result = await provider.call(prompt, options);

      await cache.set(cacheKey, result, 24 * 3600);

      llmMetrics.requestCompleted(targetProvider, options?.model || 'default', 'success', startTime);
      logger.info(`${provider.name} response received`, { responseLength: result.length, promptHash });
      return result;
    } catch (error) {
      logger.error(`LLM call failed for ${provider.name}`, { error });
      llmMetrics.requestCompleted(targetProvider, options?.model || 'default', 'error', startTime);
      if (targetProvider !== this.fallbackProvider && this.providers.has(this.fallbackProvider)) {
        logger.info(`Falling back to ${this.fallbackProvider}`);
        return this.call(prompt, this.fallbackProvider, options);
      }
      throw error;
    }
  }

  async generateWorkflow(description: string): Promise<any> {
    const cacheKey = `workflow_gen:${this.generatePromptHash(description)}`;
    return cache.wrap(cacheKey, async () => {
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
    }, 12 * 3600);
  }
}

// Export singleton instance
export const llmGateway = new LLMGateway();


