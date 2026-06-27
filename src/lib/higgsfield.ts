import {
  HiggsfieldClient,
  InputImage,
  DoPModel,
  SoulQuality,
  SoulSize,
} from "@higgsfield/client";

let client: HiggsfieldClient | null = null;

function getClient(): HiggsfieldClient {
  if (!client) {
    const apiKey = process.env.HF_API_KEY;
    const apiSecret = process.env.HF_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error(
        "Higgsfield credentials not configured. Set HF_API_KEY and HF_API_SECRET env vars."
      );
    }

    client = new HiggsfieldClient({ apiKey, apiSecret });
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
}): Promise<GenerationResult[]> {
  const c = getClient();
  const jobSet = await c.generate("soul/standard/text-to-image", {
    prompt: params.prompt,
    num_images: params.count ?? 1,
    width_and_height: params.size ?? SoulSize.LANDSCAPE_2048x1152,
    quality: params.quality ?? SoulQuality.HD,
  });

  if (jobSet.isCompleted && jobSet.jobs[0]?.results?.raw?.url) {
    return [{ url: jobSet.jobs[0].results.raw.url, type: "image" }];
  }
  throw new Error("Image generation failed");
}

export async function generateVideo(params: {
  prompt: string;
  duration?: number;
  resolution?: string;
}): Promise<GenerationResult[]> {
  const c = getClient();
  const jobSet = await c.generate("text-to-video", {
    prompt: params.prompt,
    duration: params.duration ?? 5,
    resolution: params.resolution ?? "1080p",
  });

  if (jobSet.isCompleted && jobSet.jobs[0]?.results?.raw?.url) {
    return [{ url: jobSet.jobs[0].results.raw.url, type: "video" }];
  }
  throw new Error("Video generation failed");
}

export async function imageToVideo(params: {
  imageUrl: string;
  prompt: string;
  model?: string;
}): Promise<GenerationResult[]> {
  const c = getClient();
  const jobSet = await c.generate("/v1/image2video/dop", {
    model: params.model ?? DoPModel.TURBO,
    prompt: params.prompt,
    input_images: [InputImage.fromUrl(params.imageUrl)],
  });

  if (jobSet.isCompleted && jobSet.jobs[0]?.results?.raw?.url) {
    return [{ url: jobSet.jobs[0].results.raw.url, type: "video" }];
  }
  throw new Error("Image-to-video generation failed");
}

export async function getMotions() {
  const c = getClient();
  return c.getMotions();
}

export async function getSoulStyles() {
  const c = getClient();
  return c.getSoulStyles();
}

export async function uploadImage(
  imageBuffer: Buffer,
  format?: "jpeg" | "png" | "webp"
): Promise<string> {
  const c = getClient();
  return c.uploadImage(imageBuffer, format);
}
