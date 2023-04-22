const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Hello World</h1>");
    }
  }

  if (req.method === "POST") {
    if (req.url === "/upload") {
      const filename = req.headers.filename;
      req.pipe(fs.createWriteStream(filename + ".gz")).on("finish", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File uploaded successfully");
        console.log(`File uploaded successfully: ${filename}`);
      });
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
