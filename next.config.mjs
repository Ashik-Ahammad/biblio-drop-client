/** @type {import('next').NextConfig} */

const nextConfig = {

  /* config options here */

  serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely'],

  output: "standalone",

  reactCompiler: true,

  

  env: {

    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",

    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000",

  },

 

  eslint: {

    ignoreDuringBuilds: true,

  },

  typescript: {

    ignoreBuildErrors: true,

  },


  images: {

    remotePatterns: [

      {

        protocol: 'https',

        hostname: '**',

      },

    ],

  },

  experimental: {

    serverActions: {

      bodySizeLimit: '5mb',

    },

  },

};


export default nextConfig;
