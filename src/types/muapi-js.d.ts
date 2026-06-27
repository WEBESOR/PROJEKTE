declare module "muapi-js" {
  export class MuAPI {
    constructor(apiKey: string);
    images: {
      generate(params: {
        prompt: string;
        model?: string;
        width?: number;
        height?: number;
        [key: string]: unknown;
      }): Promise<{ id: string }>;
      edit(params: {
        prompt: string;
        image: string;
        model?: string;
        [key: string]: unknown;
      }): Promise<{ id: string }>;
    };
    videos: {
      generate(params: {
        prompt: string;
        model?: string;
        duration?: number;
        aspectRatio?: string;
        [key: string]: unknown;
      }): Promise<{ id: string }>;
      fromImage(params: {
        prompt: string;
        image: string;
        model?: string;
        duration?: number;
        aspectRatio?: string;
        [key: string]: unknown;
      }): Promise<{ id: string }>;
    };
    predictions: {
      get(id: string): Promise<{ status: string; output?: { url: string }[]; data?: { url: string }[] }>;
      wait(id: string, interval?: number): Promise<{ status: string; output?: { url: string }[]; data?: { url: string }[] }>;
    };
    models: {
      list(category?: string): Record<string, string>;
    };
    account: {
      balance(): Promise<{ balance: number }>;
    };
  }
}
