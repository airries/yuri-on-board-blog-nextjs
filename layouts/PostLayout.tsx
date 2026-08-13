import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ArticleMeta from '@/components/ArticleMeta'
import TableOfContents from '@/components/TableOfContents'
import RelatedPosts from '@/components/RelatedPosts'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  relatedPosts?: CoreContent<Blog>[]
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  relatedPosts,
  children,
}: LayoutProps) {
  const { filePath, path, slug, title, toc } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment url={`${siteMetadata.siteUrl}/blog/${slug}`} title={title} />
      <article>
        <header className="border-b border-paper-border pt-6 pb-9 text-left dark:border-gray-800">
          <PageTitle>{title}</PageTitle>
          <ArticleMeta {...content} />
          <TableOfContents toc={toc} variant="mobile" />
        </header>

        <div className="pb-8 xl:grid xl:grid-cols-[10rem_minmax(0,1fr)_13rem] xl:gap-x-10">
          <aside className="border-paper-border pt-10 pb-8 dark:border-gray-800">
            <h2 className="sr-only">著者</h2>
            <ul className="flex flex-wrap justify-center gap-4 xl:block xl:space-y-8">
              {authorDetails.map((author) => (
                <li className="flex items-center space-x-2" key={author.name}>
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={38}
                      height={38}
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div className="text-sm leading-5 font-medium whitespace-nowrap">
                    <p className="text-gray-900 dark:text-gray-100">{author.name}</p>
                    {author.twitter && (
                      <Link
                        href={author.twitter}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {author.twitter
                          .replace('https://twitter.com/', '@')
                          .replace('https://x.com/', '@')}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0">
            <div className="prose max-w-none pt-10 pb-8 dark:prose-invert">{children}</div>
            <RelatedPosts posts={relatedPosts} />
            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              <Link href={discussUrl(path)} rel="nofollow">
                Discuss on Twitter
              </Link>
              {` • `}
              <Link href={editUrl(filePath)}>View on GitHub</Link>
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
          </div>

          <TableOfContents toc={toc} variant="desktop" />

          <footer className="border-t border-paper-border text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 dark:border-gray-800">
            {(next || prev) && (
              <div className="space-y-6 py-6">
                {prev?.path && (
                  <div>
                    <h2 className="mb-1 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      前の記事
                    </h2>
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {prev.title}
                    </Link>
                  </div>
                )}
                {next?.path && (
                  <div>
                    <h2 className="mb-1 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      次の記事
                    </h2>
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title}
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="pt-4">
              <Link
                href={`/${basePath}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                &larr; 記事一覧に戻る
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
