'use client'

import AnimatedDisclosure from './AnimatedDisclosure'
import Link from './Link'

interface MobileTagFilterProps {
  activeTag?: string
  tags: Array<{
    count: number
    name: string
    slug: string
  }>
}

export default function MobileTagFilter({ activeTag, tags }: MobileTagFilterProps) {
  return (
    <AnimatedDisclosure title="タグで絞り込む" openHash="tag-filter" className="mt-5 sm:hidden">
      {(open) => {
        const hash = open ? '#tag-filter' : ''

        return (
          <nav className="flex flex-wrap gap-x-4 gap-y-3" aria-label="タグ一覧">
            <Link
              href={`/blog${hash}`}
              className={
                !activeTag
                  ? 'text-sm font-medium text-primary-500'
                  : 'text-sm text-gray-600 dark:text-gray-300'
              }
            >
              すべての記事
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}${hash}`}
                className={
                  activeTag === tag.slug
                    ? 'text-sm font-medium text-primary-500'
                    : 'text-sm text-gray-600 hover:text-primary-500 dark:text-gray-300'
                }
              >
                {tag.name} ({tag.count})
              </Link>
            ))}
          </nav>
        )
      }}
    </AnimatedDisclosure>
  )
}
