const { SuperGateway } = require('supergateway');

const serverMap = {
  Supabase: process.env.SUPABASE_SSE_URL,
  Pinecone: process.env.PINECONE_SSE_URL,
  Redis:    process.env.REDIS_SSE_URL,
  // …and so on for all 30 tools…
};

const gateway = new SuperGateway({ port: process.env.PORT || 4000 });
for (let [name, url] of Object.entries(serverMap)) {
  gateway.createStream({ name, upstream: url, protocol: 'sse' });
}
gateway.listen().then(() =>
  console.log(`MCP Gateway running on port ${gateway.port}`)
);
