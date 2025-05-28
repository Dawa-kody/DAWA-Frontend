/** @type {import('next').NextConfig} */
const nextConfig = {
    // CORS 설정 (필요한 경우에만 활성화)
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          ],
        },
      ]
    }
  }
  
  module.exports = nextConfig;