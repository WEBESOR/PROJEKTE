import { MuAPI } from "muapi-js";

let client: MuAPI | null = null;

function getClient(): MuAPI {
  if (!client) {
    const apiKey = process.env.MUAPI_API_KEY;
    if (!apiKey) {
      throw new Error("MuAPI key not configured. Set MUAPI_API_KEY env var.");
    }
    client = new MuAPI(apiKey);
  }
  return client;
}

function extractUrl(result: Record<string, unknown>): string {
  if (result.url && typeof result.url === "string") return result.url;
  const data = result.data;
  if (Array.isArray(data) && data[0]?.url) return data[0].url as string;
  throw new Error("No URL in response");
}

export type MuapiResult = {
  url: string;
  type: string;
};

export async function generateImage(params: {
  prompt: string;
  model?: string;
  size?: string;
}): Promise<MuapiResult> {
  const result = await getClient().images.generate({
    prompt: params.prompt,
    model: params.model ?? "flux-dev",
    size: params.size ?? "1024x1024",
  });
  return { url: extractUrl(result), type: "image" };
}

export async function generateVideo(params: {
  prompt: string;
  model?: string;
  duration?: number;
}): Promise<MuapiResult> {
  const result = await getClient().videos.generate({
    prompt: params.prompt,
    model: params.model ?? "kling-master",
    duration: params.duration ?? 5,
  });
  return { url: extractUrl(result), type: "video" };
}

export async function imageToVideo(params: {
  prompt: string;
  imageUrl: string;
  model?: string;
}): Promise<MuapiResult> {
  const result = await getClient().videos.fromImage({
    prompt: params.prompt,
    image: params.imageUrl,
    model: params.model ?? "kling-master",
  });
  return { url: extractUrl(result), type: "video" };
}

export async function editImage(params: {
  prompt: string;
  imageUrl: string;
  model?: string;
}): Promise<MuapiResult> {
  const result = await getClient().images.edit({
    prompt: params.prompt,
    image: params.imageUrl,
    model: params.model ?? "flux-kontext-dev",
  });
  return { url: extractUrl(result), type: "image" };
}

export async function listModels() {
  return getClient().models.list();
}

export async function getBalance() {
  return getClient().account.balance();
}
