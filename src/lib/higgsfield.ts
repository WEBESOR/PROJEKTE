import { createHiggsfieldClient } from "@higgsfield/client/v2";

let client: ReturnType<typeof createHiggsfieldClient> | null = null;

function getClient(): NonNullable<ReturnType<typeof createHiggsfieldClient>> {
  if (!client) {
    const apiKey = process.env.HF_API_KEY;
    const apiSecret = process.env.HF_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("Higgsfield credentials not configured. Set HF_API_KEY and HF_API_SECRET env vars.");
    }
    client = createHiggsfieldClient({ apiKey, apiSecret });
  }
  return client;
}

export type GenerationResult = {
  url: string;
  type: string;
};

export async function generateImage(params: {
  prompt: string;
  count?: number;
  size?: string;
  quality?: string;
}): Promise<GenerationResult> {
  const c = getClient();
  const result = await c.subscribe("/v1/text2image/soul", {
    input: {
      prompt: params.prompt,
      width_and_height: params.size ?? "LANDSCAPE_2048x1152",
      quality: (params.quality ?? "1080p") as "720p" | "1080p",
      batch_size: (params.count === 4 ? 4 : 1) as 1 | 4,
    },
  });
  if (result.images?.[0]?.url) {
    return { url: result.images[0].url, type: "image" };
  }
  throw new Error("Image generation failed: " + JSON.stringify(result));
}

export async function generateVideo(params: {
  prompt: string;
  duration?: number;
}): Promise<GenerationResult> {
  const c = getClient();
  const result = await c.subscribe("/v1/text2video/soul", {
    input: {
      prompt: params.prompt,
      duration: params.duration ?? 5,
    },
  });
  if (result.video?.url) {
    return { url: result.video.url, type: "video" };
  }
  throw new Error("Video generation failed: " + JSON.stringify(result));
}

export async function imageToVideo(params: {
  imageUrl: string;
  prompt: string;
  model?: string;
}): Promise<GenerationResult> {
  const c = getClient();
  const result = await c.subscribe("/v1/image2video/dop", {
    input: {
      model: (params.model ?? "dop-turbo") as "dop-lite" | "dop-turbo" | "dop-standard",
      prompt: params.prompt,
      input_images: [{ type: "image_url", image_url: params.imageUrl }],
    },
  });
  if (result.video?.url) {
    return { url: result.video.url, type: "video" };
  }
  throw new Error("Image-to-video generation failed: " + JSON.stringify(result));
}

export async function getSoulStyles() {
  // Not directly available via v2 subscribe, return empty
  return [];
}
