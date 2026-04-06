import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
   loader: "custom",
   loaderFile: "./src/lib/cloudinary/cloudinary-loader.ts",
  },
};

export default nextConfig;
