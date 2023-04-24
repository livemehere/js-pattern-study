const stream = require("stream");

class MyReadableStream extends stream.Readable {
  cnt = 0;
  max = 3;
  constructor(options) {
    super(options);
  }

  _read(size) {
    this.cnt++;
    const str = "hello kong!";
    if (this.cnt > this.max) {
      this.push(null);
      return;
    }
    this.push(str);
  }
}

const myReadableStream = new MyReadableStream();

myReadableStream.on("data", (chunk) => {
  console.log(chunk.toString());
});
