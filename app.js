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

app.use((req, res) => {
    res.status(404);
    res.sendFile(publicPath + "/404.html");
});


server.on("request", (req, res) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "anonymous");
    app(req, res);
});

server.on("upgrade", (req, socket, head) => {
    wisp.routeRequest(req, socket, head);
});

let port = parseInt(process.env.PORT || "8080");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
    const address = server.address();

    // by default we are listening on 0.0.0.0 (every interface)
    // we just need to list a few
    console.log("Listening on:");
    console.log(`\thttp://localhost:${address.port}`);
    console.log(`\thttp://${hostname()}:${address.port}`);
    console.log(
        `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address
        }:${address.port}`
    );

});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
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