import { createHiggsfieldClient } from "@higgsfield/client/v2";

const client = createHiggsfieldClient({
  credentials: "94089acf-e0c7-4e1f-baed-fd5d9120536f:6b4b220ffc72dc248fd65622b0cc97735a983d47708e353c63fcaf01a0aaf623",
});

async function main() {
  console.log("Testing Higgsfield V2 API...");
  try {
    const result = await client.subscribe("flux-pro/kontext/max/text-to-image", {
      input: {
        prompt: "cinematic shot of an industrial building demolition, dust and sunlight, dramatic angle",
        num_images: 1,
      },
      withPolling: true,
    });
    console.log("Success! Result:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("API Error:", err.message);
  }
}

main();
