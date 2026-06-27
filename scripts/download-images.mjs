import https from "https";
import fs from "fs";
import path from "path";

const images = [
  { name: "hero.jpg", url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=85", desc: "construction site aerial" },
  { name: "rueckbau.jpg", url: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&q=85", desc: "building demolition" },
  { name: "asbest.jpg", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=85", desc: "industrial safety" },
  { name: "entsorgung.jpg", url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&q=85", desc: "waste recycling" },
  { name: "glasfaser.jpg", url: "https://images.unsplash.com/photo-1631274802425-53b1012e0e8c?w=1920&q=85", desc: "fiber optic cables" },
  { name: "gallery-1.jpg", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85", desc: "construction hard hats" },
  { name: "gallery-2.jpg", url: "https://images.unsplash.com/photo-1581578731547-c64695c7ebd4?w=1200&q=85", desc: "demolition site" },
  { name: "gallery-3.jpg", url: "https://images.unsplash.com/photo-1578996952317-46f2e5b4007f?w=1200&q=85", desc: "industrial equipment" },
  { name: "gallery-4.jpg", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85", desc: "modern building" },
  { name: "gallery-5.jpg", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=85", desc: "industrial pipes" },
  { name: "gallery-6.jpg", url: "https://images.unsplash.com/photo-1574482620811-18b22f4c81b1?w=1200&q=85", desc: "construction worker" },
  { name: "enter-rueckbau.jpg", url: "https://images.unsplash.com/photo-1581578731547-c64695c7ebd4?w=1920&q=85", desc: "demolition" },
  { name: "enter-asbest.jpg", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=85", desc: "safety gear" },
  { name: "enter-entsorgung.jpg", url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&q=85", desc: "recycling" },
  { name: "enter-glasfaser.jpg", url: "https://images.unsplash.com/photo-1631274802425-53b1012e0e8c?w=1920&q=85", desc: "fiber" },
];

const outDir = path.resolve("public/images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (r) => r.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", reject);
  });
}

async function main() {
  console.log("Downloading images...");
  for (const img of images) {
    const dest = path.join(outDir, img.name);
    if (fs.existsSync(dest)) { console.log(`  ✓ ${img.name} (exists)`); continue; }
    process.stdout.write(`  → ${img.name} (${img.desc})...`);
    await download(img.url, dest);
    console.log(" done");
  }
  console.log("All images downloaded!");
}

main().catch(console.error);
