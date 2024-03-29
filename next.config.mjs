import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import rehypePrettyCode from 'rehype-pretty-code'
import rehypeHighlight from 'rehype-highlight'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.info('dirname', __dirname)
console.info('filename', __filename)

// https://colinhemphill.com/blog/markdown-syntax-highlighting-with-the-nextjs-app-router
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
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

// /** @type {import('rehype-pretty-code').Options} */
// const options = {
//   // See Options section below
//   // https://github.com/antfu/textmate-grammars-themes/tree/main/packages/tm-themes
//   theme: 'one-dark-pro',
// }
// https://rehype-pretty-code.netlify.app/#installation

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // remarkPlugins: [remarkGfm],
    // rehypePlugins: [[rehypePrettyCode, options]],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX(nextConfig)
