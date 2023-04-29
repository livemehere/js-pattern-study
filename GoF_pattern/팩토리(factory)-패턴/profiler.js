/*
 * NODE_ENV=dev node profiler.js
 * NODE_ENV=prod node profiler.js                                                                                                   ✔ │ 04:06:37 
 * */

class Profiler {
  constructor(label) {
    this.label = label;
  }

  start() {
    this.last = new Date().getTime();
  }

  end() {
    const end = new Date().getTime();
    const diff = end - this.last;
    console.log(`${this.label} 걸린시간 : ${diff}ms`);
  }
}

function createProfiler(label) {
  if (process.env.NODE_ENV === "dev") {
    return new Profiler(label);
  } else {
    return {
      start() {},
      end() {},
    };
  }
}

const profiler = createProfiler("For 문 측정");
profiler.start();
for (let i = 0; i < 100000000; i++) {}
profiler.end();
