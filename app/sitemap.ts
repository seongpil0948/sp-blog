import { MetadataRoute } from 'next'
import { getTree } from './_utils/dir-tree'
import { APP_DOMAIN, reduceChildLinks, siteConfig } from '@/config/site'
import { uniqueFilter } from './_utils'



export default function sitemap(): MetadataRoute.Sitemap {
  const tree = getTree({dir: 'app'})
  if (!tree) return []
  const links = reduceChildLinks(tree)
  const allLinks: MetadataRoute.Sitemap = uniqueFilter([...links, APP_DOMAIN, ...[...Object.values(siteConfig.links) as string[]]].map((url) => {
    const obj = {
      url: url.trim(),
      lastModified: new Date(),
      changeFrequency: 'weekly' as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: 1,
    }
    if (url.startsWith('http')) return obj
    else if (url.startsWith("/")) {
      obj.url = `${APP_DOMAIN}${url}`
      return obj
    } else {
      obj.url = `${APP_DOMAIN}/${url}`
      return obj
    }
  }))
  return allLinks
}