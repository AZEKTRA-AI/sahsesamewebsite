/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // bcrypt is a native addon and Prisma ships its own query-engine binary.
    // Bundling either into the serverless output breaks them at runtime — keep
    // them external so Next traces the real files into the function instead.
    serverComponentsExternalPackages: ['bcrypt', '@prisma/client', 'prisma'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
