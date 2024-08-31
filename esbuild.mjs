import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";

esbuild
  .build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    minify: true,
    outfile: "./dist/main.js",
    platform: "node",
    target: "es2017",
    plugins: [GasPlugin],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
