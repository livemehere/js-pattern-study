const EventEmitter = require("events");
class Roee extends EventEmitter {
  constructor(executor) {
    super();
    const emit = this.emit.bind(this);
    this.emit = undefined;
    executor(emit);
  }
}

const ticker = new Roee((emit) => {
  let tickCnt = 0;
  setInterval(() => emit("tick", tickCnt++), 1000);
});

ticker.on("tick", (c) => {
  console.log(c);
});

ticker.emit("tick", 1); // Error 발생
