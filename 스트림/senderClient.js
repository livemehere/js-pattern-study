const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

const file = process.argv[2];
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/upload",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    filename: file,
  },
};

const req = http.request(options, (res) => {
  console.log(`Server responded with status code ${res.statusCode}`);
});

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("File successfully sent to server");
  });
