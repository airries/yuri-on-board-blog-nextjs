import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  compact?: boolean
}

// 和文タグに uppercase は効かず、英字タグだけ全大文字になって不揃いになるため使わない。
// 表示は入力どおり、リンク先だけ slug 化する。
const Tag = ({ text, compact = false }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className={
        compact
          ? 'text-xs font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'
          : 'mr-2 mb-2 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-900 dark:bg-primary-950/40 dark:text-primary-300 dark:hover:bg-primary-950/70'
      }
    >
      {text}
    </Link>
  )
}

export default Tag
