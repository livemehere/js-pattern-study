const zlib = require("zlib");
const fs = require("fs");

const file = process.argv[2];
fs.readFile(file, (err, buffer) => {
  zlib.gzip(buffer, (err, buffer) => {
    fs.writeFile(file + ".gz", buffer, (err) => {
      console.log("File successfully compressed");
    });
  });
});
