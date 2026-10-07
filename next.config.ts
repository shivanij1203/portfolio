import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo lives inside a parent directory that has its own lockfile; pin the
  // workspace root so Turbopack does not walk up and pick up the wrong one.
  turbopack: { root: __dirname },
};

export default nextConfig;
