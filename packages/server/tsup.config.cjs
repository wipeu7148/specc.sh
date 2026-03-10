// tsup.config.cjs — CJS format required when package.json has "type":"module"
// because tsup bundles the config via esbuild; ESM context breaks some deps.
/** @type {import('tsup').Options} */
module.exports = {
  entry: ["src/main.ts"],
  format: ["esm"],
  target: "node20",
  outDir: "dist",
  sourcemap: true,
  clean: true,
  splitting: false,
  // Bundle @specc/* workspace packages inline so the runner stage doesn't need
  // their dist/ directories (they are workspace symlinks in builder, not real
  // node_modules in the slimmed runner image).
  noExternal: [/@acme\/.*/],
};
