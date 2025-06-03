// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverComponentsExternalPackages: ['bcryptjs', 'jsonwebtoken', 'nodemailer']
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: ['placeholder.svg'],
//     dangerouslyAllowSVG: true,
//     unoptimized: true,
//   },
//   env: {
//     CUSTOM_KEY: process.env.CUSTOM_KEY,
//   },
//   async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
//           { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
//         ],
//       },
//     ]
//   },
// }

// export default nextConfig
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: true,
  },

  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  webpack: (config) => {
    // Exclude optional native modules (avoids SSR build errors with three.js WebSocket stuff)
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });

    // Optimize bundle
    config.optimization.minimize = true;

    return config;
  },

  env: {
    NEXT_PUBLIC_CUSTOM_KEY: process.env.NEXT_PUBLIC_CUSTOM_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Optional CORS header if you're using APIs or external content
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: false, // Use true only if you're fully handling optimization via a CDN
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },

  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig);

