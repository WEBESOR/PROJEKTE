export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/hello") {
      return new Response(JSON.stringify({ message: "Hallo von Cloudflare Workers!" }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("Worker läuft.", { status: 200 });
  },
};
