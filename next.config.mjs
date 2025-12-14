/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "assets.aceternity.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
