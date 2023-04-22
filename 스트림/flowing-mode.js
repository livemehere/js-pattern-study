process.stdin
  .on("data", (chunk) => {
    process.stdout.write(`data: ${chunk}`);
  })
  .on("end", () => {
    console.log("end!");
  });
