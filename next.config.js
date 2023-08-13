const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com"],
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

const millionConfig = {
  // auto: true,
  auto: { rsc: true },
};

const config = million.next(nextConfig, millionConfig);

module.exports = config;
