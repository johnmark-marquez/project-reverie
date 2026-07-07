import type { NextConfig } from "next";

/**
 * GitHub Pages project site URL:
 * https://johnmark-marquez.github.io/project-revierie/
 *
 * Set GITHUB_PAGES=true when building for deployment so basePath and
 * asset URLs resolve correctly on Pages. Local dev omits basePath.
 */
const repo = "project-revierie";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
