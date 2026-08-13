import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatPostDate } from '@/data/blogConfig'
import Link from './Link'

interface RelatedPostsProps {
  posts?: CoreContent<Blog>[]
}

export default function RelatedPosts({ posts = [] }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section
      className="mt-12 border-t border-paper-border pt-8 dark:border-gray-800"
      aria-labelledby="related-posts"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-primary-600 dark:text-primary-400">
        RELATED
      </p>
      <h2 id="related-posts" className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        関連記事
      </h2>
      <ul className="divide-y divide-paper-border dark:divide-gray-800">
        {posts.map((post) => (
          <li key={post.path}>
            <Link
              href={`/${post.path}`}
              className="group grid gap-2 py-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
            >
              <time
                className="text-sm text-gray-500 tabular-nums dark:text-gray-400"
                dateTime={post.date}
              >
                {formatPostDate(post.date)}
              </time>
              <span className="font-medium text-gray-900 group-hover:text-primary-500 dark:text-gray-100 dark:group-hover:text-primary-400">
                {post.title}
              </span>
              <span className="text-primary-500" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
