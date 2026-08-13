type TocItem = {
  value: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  toc?: TocItem[]
  variant: 'mobile' | 'desktop'
}

function TocLinks({ toc }: { toc: TocItem[] }) {
  return (
    <nav aria-label="記事の目次">
      <ul className="space-y-2.5">
        {toc.map((item) => (
          <li key={item.url} style={{ paddingLeft: `${Math.max(0, item.depth - 2) * 0.75}rem` }}>
            <a
              href={item.url}
              className="block leading-relaxed text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function TableOfContents({ toc = [], variant }: TableOfContentsProps) {
  if (toc.length === 0) return null

  if (variant === 'mobile') {
    return (
      <details className="mt-6 border-y border-paper-border py-3 text-sm xl:hidden dark:border-gray-800">
        <summary className="cursor-pointer font-medium text-primary-600 dark:text-primary-400">
          目次
        </summary>
        <div className="pt-3">
          <TocLinks toc={toc} />
        </div>
      </details>
    )
  }

  return (
    <aside className="sticky top-6 hidden self-start border-l border-gray-200 pl-5 text-sm xl:block dark:border-gray-800">
      <p className="mb-3 text-xs font-medium tracking-[0.16em] text-gray-400 uppercase dark:text-gray-500">
        Contents
      </p>
      <TocLinks toc={toc} />
    </aside>
  )
}
