import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatPostDate } from '@/data/blogConfig'
import Tag from './Tag'

type ArticleMetaProps = Pick<CoreContent<Blog>, 'date' | 'lastmod' | 'readingTime' | 'tags'>

export default function ArticleMeta({ date, lastmod, readingTime, tags }: ArticleMetaProps) {
  const minutes = Math.max(1, Math.ceil(readingTime?.minutes ?? 0))
  const itemClassName = 'flex gap-2'
  const labelClassName = 'text-gray-400'

  return (
    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 max-sm:grid max-sm:grid-cols-2 max-sm:py-3">
      <div className={itemClassName}>
        <dt className={labelClassName}>公開</dt>
        <dd>
          <time dateTime={date}>{formatPostDate(date)}</time>
        </dd>
      </div>
      {lastmod && (
        <div className={itemClassName}>
          <dt className={labelClassName}>更新</dt>
          <dd>
            <time dateTime={lastmod}>{formatPostDate(lastmod)}</time>
          </dd>
        </div>
      )}
      <div className={itemClassName}>
        <dt className={labelClassName}>読了</dt>
        <dd>約{minutes}分</dd>
      </div>
      {tags && tags.length > 0 && (
        <div className={`${itemClassName} max-sm:col-span-2`}>
          <dt className={labelClassName}>タグ</dt>
          <dd className="flex flex-wrap gap-x-2 gap-y-1">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} compact />
            ))}
          </dd>
        </div>
      )}
    </dl>
  )
}
