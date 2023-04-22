function* iteratorGenerator() {
  yield 1;
  yield 2;
  yield 3;
  console.log(1);
  return "finish";
}

const iterator = iteratorGenerator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

console.clear();

/* next() 는 반드시 yield 까지만 읽고 멈춘다. 다음 next() 는 그 yield 에서 부터 시작하고, 파라미터가 있다면 대입하는 행동이 추가된다. */
function* twoWayGenerator() {
  try {
    const what = yield "first";
    console.log("what", what);
    return "done";
  } catch (err) {
    console.error("err");
  }
}

const twoWay = twoWayGenerator();
console.log(twoWay.next());
console.log(twoWay.throw(new Error("Something went wrong."))); // 에러를 캐치하기 위해서는 next() 가아닌  throw() 를 사용해야 한다.
