import { MetadataRoute } from 'next'
import { getTree } from './_utils/dir-tree'
import { APP_DOMAIN, reduceChildLinks, siteConfig } from '@/config/site'
import { uniqueFilter } from './_utils'



export default function sitemap(): MetadataRoute.Sitemap {
  const tree = getTree({dir: 'app'})
  if (!tree) return []
  const links = reduceChildLinks(tree)
  const allLinks: MetadataRoute.Sitemap = uniqueFilter([...links, '/', APP_DOMAIN, ...[...Object.values(siteConfig.links) as string[]]].map((url) => {
    return {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  }))
  // stop process
  return allLinks
}