import type { NextConfig } from "next";
// import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

// export default withHydrationOverlay({ appRootSelector: "main" })(nextConfig);
export default nextConfig;
