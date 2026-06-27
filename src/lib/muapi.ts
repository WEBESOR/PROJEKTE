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

async function waitForResult(id: string) {
  return getClient().predictions.wait(id);
}

export type MuapiResult = {
  url: string;
  type: string;
};

export async function generateImage(params: {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
}): Promise<MuapiResult> {
  const { id } = await getClient().images.generate({
    prompt: params.prompt,
    model: params.model ?? "flux-dev",
    width: params.width ?? 1024,
    height: params.height ?? 1024,
  });
  const result = await waitForResult(id);
  const url = result.output?.[0]?.url ?? result.data?.[0]?.url;
  if (!url) throw new Error("No URL in response: " + JSON.stringify(result));
  return { url, type: "image" };
}

export async function generateVideo(params: {
  prompt: string;
  model?: string;
  duration?: number;
  aspectRatio?: string;
}): Promise<MuapiResult> {
  const { id } = await getClient().videos.generate({
    prompt: params.prompt,
    model: params.model ?? "kling-master",
    duration: params.duration ?? 5,
    aspectRatio: params.aspectRatio ?? "16:9",
  });
  const result = await waitForResult(id);
  const url = result.output?.[0]?.url ?? result.data?.[0]?.url;
  if (!url) throw new Error("No URL in response: " + JSON.stringify(result));
  return { url, type: "video" };
}

export async function imageToVideo(params: {
  prompt: string;
  imageUrl: string;
  model?: string;
  duration?: number;
}): Promise<MuapiResult> {
  const { id } = await getClient().videos.fromImage({
    prompt: params.prompt,
    image: params.imageUrl,
    model: params.model ?? "kling-std",
    duration: params.duration ?? 5,
  });
  const result = await waitForResult(id);
  const url = result.output?.[0]?.url ?? result.data?.[0]?.url;
  if (!url) throw new Error("No URL in response: " + JSON.stringify(result));
  return { url, type: "video" };
}

export async function editImage(params: {
  prompt: string;
  imageUrl: string;
  model?: string;
}): Promise<MuapiResult> {
  const { id } = await getClient().images.edit({
    prompt: params.prompt,
    image: params.imageUrl,
    model: params.model ?? "flux-kontext-dev",
  });
  const result = await waitForResult(id);
  const url = result.output?.[0]?.url ?? result.data?.[0]?.url;
  if (!url) throw new Error("No URL in response: " + JSON.stringify(result));
  return { url, type: "image" };
}

export async function listModels() {
  return getClient().models.list();
}

export async function getBalance() {
  return getClient().account.balance();
}
