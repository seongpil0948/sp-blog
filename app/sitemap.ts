import { ALL_LINKS } from '@/config/site'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_LINKS.map((url) => {
    return {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  })
}