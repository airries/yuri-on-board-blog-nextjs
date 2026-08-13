import { formatPostDate } from '@/data/blogConfig'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import MobileTagFilter from '@/components/MobileTagFilter'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
  // 一覧の基点 ("blog" など)。usePathname で導くとクライアント境界が要るので props で渡す
  basePath: string
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: Omit<PaginationProps, 'basePath'>
  // 表示中のタグ (slug)。未指定なら「すべての記事」を選択中として扱う
  activeTag?: string
  basePath?: string
}

function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            前へ
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            前へ
          </Link>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            次へ
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            次へ
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  activeTag,
  basePath = 'blog',
}: ListLayoutProps) {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const mobileTags = sortedTags.map((tag) => ({
    count: tagCounts[tag],
    name: tag,
    slug: slug(tag),
  }))

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary-600 dark:text-primary-400">
            ARTICLES
          </p>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
          <MobileTagFilter activeTag={activeTag} tags={mobileTags} />
        </div>
        <div className="flex sm:space-x-24">
          <aside className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] overflow-auto rounded-xl border border-paper-border bg-paper-panel/55 p-4 text-sm shadow-sm shadow-gray-200/40 sm:block dark:border-gray-800 dark:bg-gray-900/60 dark:shadow-none">
            <div className="mb-3 flex items-center gap-3 px-2">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">タグ</p>
              <span className="h-px flex-1 bg-paper-border dark:bg-gray-700" aria-hidden="true" />
            </div>
            <nav aria-label="タグ一覧">
              <Link
                href="/blog"
                aria-current={!activeTag ? 'page' : undefined}
                className={`block rounded-md px-2 py-2 text-base transition-colors hover:bg-white/70 hover:text-primary-500 dark:hover:bg-gray-800/80 dark:hover:text-primary-400 ${
                  !activeTag
                    ? 'font-semibold text-primary-500'
                    : 'font-medium text-gray-600 dark:text-gray-300'
                }`}
              >
                すべての記事
              </Link>
              <ul className="mt-1 space-y-1">
                {sortedTags.map((t) => {
                  const tagSlug = slug(t)
                  const isActive = activeTag === tagSlug
                  return (
                    <li key={t}>
                      <Link
                        href={`/tags/${tagSlug}`}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block rounded-md px-2 py-2 text-base transition-colors hover:bg-white/70 hover:text-primary-500 dark:hover:bg-gray-800/80 dark:hover:text-primary-400 ${
                          isActive
                            ? 'font-semibold text-primary-500'
                            : 'font-medium text-gray-600 dark:text-gray-300'
                        }`}
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
          <div>
            <ul className="divide-y divide-paper-border dark:divide-gray-800">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-6 first:pt-0">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatPostDate(date)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                basePath={basePath}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
