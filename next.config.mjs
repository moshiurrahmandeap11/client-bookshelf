/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // ✅ ইমেজ কনফিগারেশন যোগ করুন
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // সমস্ত পাথ অনুমোদন
      },
    ],
  },
};

export default nextConfig;