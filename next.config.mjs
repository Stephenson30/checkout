/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default withPWA(nextConfig);
