// contentlayer は webpack プラグイン (withContentlayer) ではなく独立したコマンドで動かす。
// プラグイン経由だと Turbopack で再生成が走らないため、package.json の
// dev / build 側で contentlayer2 を明示的に実行している。
const developmentScriptPolicy = process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${developmentScriptPolicy} https://giscus.app https://analytics.umami.is https://*.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://avatars.githubusercontent.com https://*.google-analytics.com https://*.googletagmanager.com;
  media-src 'self';
  connect-src 'self' https://giscus.app https://analytics.umami.is https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
  font-src 'self';
  frame-src https://giscus.app;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = {
  output,
  basePath,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
