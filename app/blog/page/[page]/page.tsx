import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { POSTS_PER_PAGE } from '@/data/blogConfig'
import { notFound } from 'next/navigation'

export const dynamicParams = false

// 1 ページ目は /blog と同じ内容だが、ここでも生成する。
// output: export は動的ルートが 1 件も生成されないとビルドに失敗するため、
// 記事が POSTS_PER_PAGE 以下のとき (= totalPages が 1) に空配列を返せない。
// 重複は canonical と sitemap で /blog 側に寄せる。
export const generateStaticParams = async () => {
  const publishedPosts = allCoreContent(allBlogs)
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)

  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return genPageMetadata({
    title: `記事一覧 - ${page}ページ目`,
    // 1 ページ目の正規 URL は /blog。重複コンテンツとして扱われないようにする
    alternates: { canonical: page === '1' ? '/blog' : './' },
  })
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = Number(params.page)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
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
