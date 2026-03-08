/** @type {import('next').NextConfig} */

const nextConfig= {

  async headers() {
      return [
          {
              source: '/(.*)',
              headers: [
                  {
                      key: 'Content-Security-Policy',
                      value: "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com;",
                  },
              ],
          },
      ]
  },

   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
