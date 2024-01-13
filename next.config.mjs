import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  cleanDistDir: true,
  async rewrites() {
    return [
      {
        source: '/acf/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_PROXY_BASE_URL}/:path*`,
      },
    ]
  },
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below
  // https://github.com/antfu/textmate-grammars-themes/tree/main/packages/tm-themes
  theme: 'one-dark-pro',
}
// https://rehype-pretty-code.netlify.app/#installation

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
})

export default withMDX(nextConfig)
