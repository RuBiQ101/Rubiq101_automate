export interface LLMProvider {
  name: string;
  call(prompt: string, options?: any): Promise<string>;
}

export class OpenAIProvider implements LLMProvider {
  name = 'openai';
  private client: any;

  constructor(apiKey: string) {
    const { OpenAI } = require('openai');
    this.client = new OpenAI({ apiKey });
  }

  async call(prompt: string, options: any = {}): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
    });
    return response.choices[0]?.message?.content || '';
  }
}

export class AnthropicProvider implements LLMProvider {
  name = 'anthropic';
  private client: any;

  constructor(apiKey: string) {
    const { Anthropic } = require('@anthropic-ai/sdk');
    this.client = new Anthropic({ apiKey });
  }

  async call(prompt: string, options: any = {}): Promise<string> {
    const response = await this.client.messages.create({
      model: options.model || 'claude-3-sonnet-20240229',
      max_tokens: options.maxTokens || 1000,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.content[0]?.text || '';
  }
}


