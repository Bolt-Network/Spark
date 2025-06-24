import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { join } from "node:path";
import { hostname } from "node:os";

const __dirname = process.cwd();
const app = fastify({
    logger: true
});

const publicPath = join(__dirname, "public");

await app.register(fastifyCompress, {
    threshold: 1024,
    encodings: ['gzip', 'deflate']
});

await app.register(fastifyStatic, {
    root: publicPath,
    prefix: '/',
});

app.addHook('onSend', async (request, reply) => {
    reply.header("Cross-Origin-Opener-Policy", "same-origin");
    reply.header("Cross-Origin-Embedder-Policy", "anonymous");
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    reply.header('X-Content-Type-Options', 'nosniff');
    reply.header('X-Frame-Options', 'SAMEORIGIN');
    reply.header('X-XSS-Protection', '1; mode=block');
    reply.header('Referrer-Policy', 'strict-origin-when-cross-origin');
});

app.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
});

app.get("/games", async (request, reply) => {
    return reply.sendFile("games.html");
});

app.get('/play/*', async (request, reply) => {
    return reply.sendFile("game.html");
});

app.setNotFoundHandler(async (request, reply) => {
    reply.code(404);
    return reply.sendFile("404.html");
});

let port = parseInt(process.env.PORT || "3000");
if (isNaN(port)) port = 3000;

async function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    await app.close();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

try {
    await app.listen({
        port,
        host: '0.0.0.0'
    });

    console.log("Listening on:");
    console.log(`\thttp://localhost:${port}`);
    console.log(`\thttp://${hostname()}:${port}`);

    const addresses = await app.addresses();
    addresses.forEach(addr => {
        const host = addr.family === "IPv6" ? `[${addr.address}]` : addr.address;
        console.log(`\thttp://${host}:${addr.port}`);
    });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}