import type { NextConfig } from "next";

/**
 * @hanzo/ui draws through @hanzo/gui, which is a react-native-web renderer on
 * the browser. Two resolver facts follow, and both have to hold in dev AND in
 * build or the two disagree:
 *
 *  - `react-native` means `react-native-web` here. Without the alias the
 *    resolver reaches the real package, which ships untranspiled Flow and dies
 *    on `import typeof` before any of our code runs.
 *  - `.web.js` wins over `.js`. That is how react-native-svg (under the icon
 *    set) offers a browser implementation of the same module — it is picked by
 *    extension order, not by an export map, so the order is the whole mechanism.
 */
const alias = { "react-native": "react-native-web" };
const extensions = [".web.tsx", ".web.ts", ".web.jsx", ".web.js"];

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  turbopack: {
    resolveAlias: alias,
    resolveExtensions: [...extensions, ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, "react-native$": "react-native-web" };
    config.resolve.extensions = [...extensions, ...config.resolve.extensions];
    return config;
  },
};

export default nextConfig;
