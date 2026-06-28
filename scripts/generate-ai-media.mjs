const HF_API_KEY = process.env.HF_API_KEY;
const HF_API_SECRET = process.env.HF_API_SECRET;
if (!HF_API_KEY || !HF_API_SECRET) {
  console.error("❌ HF_API_KEY and HF_API_SECRET env vars required");
  process.exit(1);
}

const BASE = "https://platform.higgsfield.ai";
const AUTH = { Authorization: `Key ${HF_API_KEY}:${HF_API_SECRET}`, "Content-Type": "application/json" };
const POLL_INTERVAL = 2000;
const MAX_POLL_TIME = 300000;

const generations = [
  { file: "hero.jpg", prompt: "cinematic wide shot of construction site at golden hour, heavy machinery silhouettes, dust particles in warm light, industrial atmosphere, dramatic sky, 8k quality", size: "2048x1152" },
  { file: "rueckbau.jpg", prompt: "industrial building demolition, excavator tearing down concrete structure, dust clouds, dramatic sunlight breaking through, cinematic composition, dark moody tones", size: "2048x1152" },
  { file: "asbest.jpg", prompt: "professional asbestos removal team in hazmat suits, blue protective gear, decontamination chamber, industrial safety lights, cinematic, photorealistic", size: "2048x1152" },
  { file: "entsorgung.jpg", prompt: "large construction waste recycling facility, sorted piles of materials, conveyor belts, industrial scale, dramatic lighting, cinematic", size: "2048x1152" },
  { file: "glasfaser.jpg", prompt: "fiber optic cables glowing with blue light, technician installing network infrastructure, data center, neon cyan accents, cinematic", size: "2048x1152" },
  { file: "enter-rueckbau.jpg", prompt: "dramatic low angle shot of building demolition, debris falling, dust illuminated by sunlight, amber and dark tones, cinematic film still", size: "2048x1152" },
  { file: "enter-asbest.jpg", prompt: "mysterious industrial corridor, blue safety lights, hazmat suits hanging, hazardous environment, cinematic, dark atmosphere, teal and orange", size: "2048x1152" },
  { file: "enter-entsorgung.jpg", prompt: "massive recycling plant interior, compressed waste cubes, industrial machinery, dramatic scale, orange and dark tones, cinematic", size: "2048x1152" },
  { file: "enter-glasfaser.jpg", prompt: "abstract glowing fiber optic network, cyan light trails, dark background, futuristic technology, cinematic, neon blue aesthetic", size: "2048x1152" },
  { file: "gallery-1.jpg", prompt: "construction workers in orange vests on steel structure at sunset, hard hats, industrial background, cinematic lighting", size: "1536x1536" },
  { file: "gallery-2.jpg", prompt: "aerial view of demolition site, excavator on rubble pile, geometric patterns of destruction, dramatic shadows", size: "1536x1536" },
  { file: "gallery-3.jpg", prompt: "close-up of heavy construction machinery, hydraulic arm, mechanical details, oil and dirt, cinematic industrial aesthetic", size: "1536x1536" },
  { file: "gallery-4.jpg", prompt: "modern glass skyscraper under construction, crane against sunset sky, architectural beauty, cinematic wide shot", size: "1536x1536" },
  { file: "gallery-5.jpg", prompt: "industrial pipe system, steam valves, metallic textures, dramatic workshop lighting, dark moody industrial photography", size: "1536x1536" },
  { file: "gallery-6.jpg", prompt: "portrait of construction worker, hard hat, face covered in dust, welding sparks in background, dramatic cinematic lighting", size: "1536x1536" },
];

async function submitGenerate(params) {
  const resp = await fetch(`${BASE}/v1/text2image/soul`, {
    method: "POST", headers: AUTH,
    body: JSON.stringify({ params }),
  });
  if (!resp.ok) {
    const err = await resp.text().catch(() => "");
    if (resp.status === 403) throw new Error(`Not enough credits: ${err}`);
    throw new Error(`HTTP ${resp.status}: ${err}`);
  }
  const data = await resp.json();
  if (!data.request_id) throw new Error("No request_id: " + JSON.stringify(data));
  return data.request_id;
}

async function pollStatus(requestId) {
  const start = Date.now();
  while (true) {
    if (Date.now() - start > MAX_POLL_TIME) throw new Error("Polling timeout");
    const resp = await fetch(`${BASE}/requests/${requestId}/status`, { headers: AUTH });
    if (!resp.ok) throw new Error(`Status poll HTTP ${resp.status}`);
    const result = await resp.json();
    if (result.status === "completed") {
      const url = result.images?.[0]?.url;
      if (url) return url;
      throw new Error("No URL: " + JSON.stringify(result));
    }
    if (["failed", "nsfw"].includes(result.status))
      throw new Error(`Generation ${result.status}`);
    await new Promise(r => setTimeout(r, POLL_INTERVAL));
  }
}

async function download(url, dest) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Download HTTP ${resp.status}`);
  const fs = await import("fs");
  fs.writeFileSync(dest, Buffer.from(await resp.arrayBuffer()));
}

async function main() {
  console.log("=".repeat(50));
  console.log("  LORE:BAU AI Media Generator (Higgsfield)");
  console.log("=".repeat(50));

  for (const gen of generations) {
    const dest = `public/images/${gen.file}`;
    const fs = await import("fs");
    if (fs.existsSync(dest)) { console.log(`  ✓ ${gen.file} (exists)`); continue; }

    process.stdout.write(`  → ${gen.file}...`);
    try {
      const id = await submitGenerate({
        prompt: gen.prompt,
        width_and_height: gen.size,
        quality: "720p",
        batch_size: 1,
      });
      const url = await pollStatus(id);
      await download(url, dest);
      console.log(" done");
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  console.log("\n✅ Done! Images in public/images/");
}

main().catch(console.error);
