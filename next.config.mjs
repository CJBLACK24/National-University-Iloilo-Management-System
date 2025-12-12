/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "assets.aceternity.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
