function divide(v1, v2, cb) {
  process.nextTick(() => {
    const result = v1 / v2;
    if (result === Infinity) {
      cb?.(new Error("0으로 나눌 수 없습니다."));
      return Promise.reject(new Error("0으로 나눌 수 없습니다."));
    }
    cb?.(null, result);
    return Promise.resolve(result);
  });
}

divide(10, 2, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

console.log("after divide");
