import type { NextConfig } from "next";

// GITHUB_PAGES=true switches to a static export suitable for GitHub Pages
// project sites (served from /<repo>/, not the domain root). Used by
// `pnpm build:pages` — see README for the deploy flow. Vercel deploys
// (the default per docs/decisions/0001-tech-stack.md) don't set this and
// get the normal Next.js server build.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "projetos-orquestration";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
