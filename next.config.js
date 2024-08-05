/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "cloudflare-ipfs.com",
      "lh3.googleusercontent.com",
    ],
  },
  async redirects() {
    return [
      {
        //! Redirect until we find a good alternative for chat-gpt
        source: "/:lang/ask-gpt",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
