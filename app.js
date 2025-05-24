import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import { hostname } from "node:os";

const __dirname = process.cwd();
const app = express();

const publicPath = join(__dirname, "public");

app.use(express.static(publicPath));

const server = createServer();

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get('/~/*', (req, res) => {
    res.sendFile(publicPath + "/game.html");
});

app.get('*', (req, res) => {
    res.status(404);
    res.sendFile(publicPath + "/404.html");
});

server.on("request", (req, res) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "anonymous");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    app(req, res);
});
let port = parseInt(process.env.PORT || "3000");

if (isNaN(port)) port = 3000;

server.on("listening", () => {
    const address = server.address();

    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );

});


process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close();
    process.exit(0);
}

server.listen({
    port,
});