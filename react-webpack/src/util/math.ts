function add(a: number, b: number): number {
  return a + b;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
