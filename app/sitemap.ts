import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { POSTS_PER_PAGE } from '@/data/blogConfig'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const publishedBlogs = allBlogs.filter((post) => !post.draft)
  const encodePath = (value: string) => value.split('/').map(encodeURIComponent).join('/')

  const blogRoutes = publishedBlogs.map((post) => ({
    url: `${siteUrl}/${encodePath(post.path)}`,
    lastModified: post.lastmod || post.date,
  }))

  const staticRoutes = ['', 'blog', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
  }))

  const tagRoutes = Object.keys(tagData).map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
  }))

  const totalPages = Math.ceil(publishedBlogs.length / POSTS_PER_PAGE)
  const paginationRoutes = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    url: `${siteUrl}/blog/page/${index + 2}`,
  }))

  return [...staticRoutes, ...blogRoutes, ...tagRoutes, ...paginationRoutes]
}
