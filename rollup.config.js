import resolve from "rollup-plugin-node-resolve";
export default {
  input: "index.js",
  output: {
    file: "bin/main.js",
    format: "cjs",
    // shebang for *nix
    banner: "#!/usr/bin/env node"
  },
  plugins: [resolve()]
};
