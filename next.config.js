const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
      // Define your runtime caching configurations here
      ...runtimeCaching,
    ],
    buildExcludes: [/middleware-manifest.json$/],
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: [
      'media-exp1.licdn.com',
      'instagram.fpnq10-1.fna.fbcdn.net',
      'scontent-bom1-2.cdninstagram.com',
      'legiteye.com',
    ],
  },
});
