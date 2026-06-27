/**
 * AI Media Generator für LORE:BAU
 * 
 * Usage: node scripts/generate-ai-media.mjs
 * Erfordert: MUAPI_API_KEY env var
 *
 * Generiert alle Bilder/Videos via Muapi.ai und speichert sie in public/images und public/videos
 */

const MUAPI_KEY = process.env.MUAPI_API_KEY;
if (!MUAPI_KEY) {
  console.error("❌ MUAPI_API_KEY env var required");
  console.log("Get one at https://muapi.ai");
  process.exit(1);
}

const { MuAPI } = await import("muapi-js");
const client = new MuAPI(MUAPI_KEY);

const generations = [
  // Hero Background
  { type: "image", file: "hero.jpg", model: "flux-dev",
    prompt: "cinematic wide shot of construction site at golden hour, heavy machinery silhouettes, dust particles in warm light, industrial atmosphere, dramatic sky, 8k quality" },

  // Service images
  { type: "image", file: "rueckbau.jpg", model: "flux-dev",
    prompt: "industrial building demolition, excavator tearing down concrete structure, dust clouds, dramatic sunlight breaking through, cinematic composition, dark moody tones" },
  { type: "image", file: "asbest.jpg", model: "flux-dev",
    prompt: "professional asbestos removal team in hazmat suits, blue protective gear, decontamination chamber, industrial safety lights, cinematic, photorealistic" },
  { type: "image", file: "entsorgung.jpg", model: "flux-dev",
    prompt: "large construction waste recycling facility, sorted piles of materials, conveyor belts, industrial scale, dramatic lighting, cinematic" },
  { type: "image", file: "glasfaser.jpg", model: "flux-dev",
    prompt: "fiber optic cables glowing with blue light, technician installing network infrastructure, data center, neon cyan accents, cinematic" },

  // Enterpage backgrounds
  { type: "image", file: "enter-rueckbau.jpg", model: "flux-dev",
    prompt: "dramatic low angle shot of building demolition, debris falling, dust illuminated by sunlight, amber and dark tones, cinematic film still" },
  { type: "image", file: "enter-asbest.jpg", model: "flux-dev",
    prompt: "mysterious industrial corridor, blue safety lights, hazmat suits hanging, hazardous environment, cinematic, dark atmosphere, teal and orange" },
  { type: "image", file: "enter-entsorgung.jpg", model: "flux-dev",
    prompt: "massive recycling plant interior, compressed waste cubes, industrial machinery, dramatic scale, orange and dark tones, cinematic" },
  { type: "image", file: "enter-glasfaser.jpg", model: "flux-dev",
    prompt: "abstract glowing fiber optic network, cyan light trails, dark background, futuristic technology, cinematic, neon blue aesthetic" },

  // Gallery
  { type: "image", file: "gallery-1.jpg", model: "flux-dev",
    prompt: "construction workers in orange vests on steel structure at sunset, hard hats, industrial background, cinematic lighting" },
  { type: "image", file: "gallery-2.jpg", model: "flux-dev",
    prompt: "aerial view of demolition site, excavator on rubble pile, geometric patterns of destruction, dramatic shadows" },
  { type: "image", file: "gallery-3.jpg", model: "flux-dev",
    prompt: "close-up of heavy construction machinery, hydraulic arm, mechanical details, oil and dirt, cinematic industrial aesthetic" },
  { type: "image", file: "gallery-4.jpg", model: "flux-dev",
    prompt: "modern glass skyscraper under construction, crane against sunset sky, architectural beauty, cinematic wide shot" },
  { type: "image", file: "gallery-5.jpg", model: "flux-dev",
    prompt: "industrial pipe system, steam valves, metallic textures, dramatic workshop lighting, dark moody industrial photography" },
  { type: "image", file: "gallery-6.jpg", model: "flux-dev",
    prompt: "portrait of construction worker, hard hat, face covered in dust, welding sparks in background, dramatic cinematic lighting" },
];

async function download(url, dest) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const buf = Buffer.from(await resp.arrayBuffer());
  const fs = await import("fs");
  fs.writeFileSync(dest, buf);
}

async function main() {
  console.log("=" .repeat(50));
  console.log("  LORE:BAU AI Media Generator");
  console.log("=" .repeat(50));

  for (const gen of generations) {
    const dest = `public/images/${gen.file}`;
    const fs = await import("fs");
    if (fs.existsSync(dest)) { console.log(`  ✓ ${gen.file} (exists)`); continue; }

    process.stdout.write(`  → Generating ${gen.file}...`);
    try {
      const isGallery = gen.file.startsWith("gallery");
      const { id } = await client.images.generate({
        prompt: gen.prompt,
        model: gen.model,
        width: isGallery || gen.file.startsWith("enter-") ? 1024 : 1920,
        height: isGallery ? 1024 : 1080,
      });
      const result = await client.predictions.wait(id);
      const url = result.output?.[0]?.url || result.data?.[0]?.url;
      if (!url) throw new Error("No URL in response: " + JSON.stringify(result));
      await download(url, dest);
      console.log(" done  ");
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  console.log("\n✅ All done! Images saved to public/images/");
}

main().catch(console.error);
