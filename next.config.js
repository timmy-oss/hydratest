/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fabaaw.infura-ipfs.io",
        // port: "",
        // pathname: "/account123/**",
      },

       {
        protocol: "https",
        hostname: "res.cloudinary.com",
       
      },
    ],
  },
};
