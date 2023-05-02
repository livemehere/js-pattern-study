import removeConsole from "./plugin/remove-conosle.js";

export default () => {
  return {
    input: "index.tsx",
    output: {
      file: "dist/bundle.js",
    },
    plugins: [removeConsole()],
    treeshake: false,
  };
};
