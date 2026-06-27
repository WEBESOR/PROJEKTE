declare module "muapi-js" {
  export class MuAPI {
    constructor(apiKey: string);
    images: {
      generate(params: {
        prompt: string;
        model?: string;
        size?: string;
        [key: string]: unknown;
      }): Promise<Record<string, unknown>>;
      edit(params: {
        prompt: string;
        image: string;
        model?: string;
        [key: string]: unknown;
      }): Promise<Record<string, unknown>>;
    };
    videos: {
      generate(params: {
        prompt: string;
        model?: string;
        duration?: number;
        [key: string]: unknown;
      }): Promise<Record<string, unknown>>;
      fromImage(params: {
        prompt: string;
        image: string;
        model?: string;
        [key: string]: unknown;
      }): Promise<Record<string, unknown>>;
    };
    models: {
      list(): Promise<unknown[]>;
    };
    account: {
      balance(): Promise<{ balance: number }>;
    };
  }
}
