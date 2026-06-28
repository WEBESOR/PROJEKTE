const BASE_URL = "https://platform.higgsfield.ai";
const POLL_INTERVAL = 2000;
const MAX_POLL_TIME = 300000;

function getAuth() {
  const apiKey = process.env.HF_API_KEY;
  const apiSecret = process.env.HF_API_SECRET;
  if (!apiKey || !apiSecret)
    throw new Error("Higgsfield credentials not configured. Set HF_API_KEY and HF_API_SECRET env vars.");
  return { Authorization: `Key ${apiKey}:${apiSecret}`, "Content-Type": "application/json" };
}

export type GenerationResult = { url: string; type: string };

export async function generateImage(params: {
  prompt: string;
  size?: string;
  quality?: string;
}): Promise<GenerationResult> {
  const headers = getAuth();
  const resp = await fetch(`${BASE_URL}/v1/text2image/soul`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      params: {
        prompt: params.prompt,
        width_and_height: params.size ?? "2048x1152",
        quality: (params.quality ?? "1080p") as "720p" | "1080p",
        batch_size: 1,
      },
    }),
  });

  if (!resp.ok) {
    const err = await resp.text().catch(() => "");
    if (resp.status === 403) throw new Error(`Not enough credits: ${err}`);
    throw new Error(`HTTP ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  const requestId = data.request_id;
  if (!requestId) throw new Error("No request_id: " + JSON.stringify(data));

  const startTime = Date.now();
  while (true) {
    if (Date.now() - startTime > MAX_POLL_TIME)
      throw new Error(`Polling timeout after ${MAX_POLL_TIME}ms`);

    const statusResp = await fetch(`${BASE_URL}/requests/${requestId}/status`, { headers });

    if (!statusResp.ok) {
      const err = await statusResp.text().catch(() => "");
      throw new Error(`Status poll HTTP ${statusResp.status}: ${err}`);
    }

    const result = await statusResp.json();

    if (result.status === "completed") {
      const url = result.images?.[0]?.url;
      if (url) return { url, type: "image" };
      throw new Error("No images: " + JSON.stringify(result));
    }

    if (result.status === "failed" || result.status === "nsfw")
      throw new Error(`Generation ${result.status}: ${JSON.stringify(result)}`);

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
}

export async function imageToVideo(params: {
  imageUrl: string;
  prompt: string;
  model?: string;
}): Promise<GenerationResult> {
  const headers = getAuth();
  const models = ["dop-lite", "dop-turbo", "dop-standard"] as const;
  const model = (params.model ?? "dop-turbo") as (typeof models)[number];
  if (!models.includes(model)) throw new Error(`Invalid model: ${model}`);

  const resp = await fetch(`${BASE_URL}/v1/image2video/dop`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      params: {
        model,
        prompt: params.prompt,
        input_images: [{ type: "image_url", image_url: params.imageUrl }],
      },
    }),
  });

  if (!resp.ok) {
    const err = await resp.text().catch(() => "");
    if (resp.status === 403) throw new Error(`Not enough credits: ${err}`);
    throw new Error(`HTTP ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  const requestId = data.request_id;
  if (!requestId) throw new Error("No request_id: " + JSON.stringify(data));

  const startTime = Date.now();
  while (true) {
    if (Date.now() - startTime > MAX_POLL_TIME)
      throw new Error(`Polling timeout after ${MAX_POLL_TIME}ms`);

    const statusResp = await fetch(`${BASE_URL}/requests/${requestId}/status`, { headers });

    if (!statusResp.ok) {
      const err = await statusResp.text().catch(() => "");
      throw new Error(`Status poll HTTP ${statusResp.status}: ${err}`);
    }

    const result = await statusResp.json();

    if (result.status === "completed") {
      const url = result.video?.url;
      if (url) return { url, type: "video" };
      throw new Error("No video: " + JSON.stringify(result));
    }

    if (result.status === "failed" || result.status === "nsfw")
      throw new Error(`Generation ${result.status}: ${JSON.stringify(result)}`);

    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
  }
}
