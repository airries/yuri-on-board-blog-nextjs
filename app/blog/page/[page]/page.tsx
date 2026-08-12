import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { POSTS_PER_PAGE } from '@/data/blogConfig'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export const generateStaticParams = async () => {
  const publishedPosts = allCoreContent(allBlogs)
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    page: (i + 2).toString(),
  }))

  return paths
}

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return genPageMetadata({
    title: `記事一覧 - ${page}ページ目`,
    alternates: { canonical: './' },
  })
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = Number(params.page)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="すべての記事"
    />
  )
}
