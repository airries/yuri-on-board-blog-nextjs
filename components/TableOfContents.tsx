import AnimatedDisclosure from './AnimatedDisclosure'

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
              className="block rounded-md px-2 py-1.5 leading-relaxed text-gray-600 transition-colors hover:bg-white/70 hover:text-primary-500 dark:text-gray-400 dark:hover:bg-gray-800/80 dark:hover:text-primary-400"
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
      <AnimatedDisclosure title="目次" className="mt-6 text-sm xl:hidden">
        <TocLinks toc={toc} />
      </AnimatedDisclosure>
    )
  }

  return (
    <aside className="sticky top-6 mt-10 hidden self-start rounded-xl border border-paper-border bg-paper-panel/55 p-4 text-sm shadow-sm shadow-gray-200/40 xl:block dark:border-gray-800 dark:bg-gray-900/60 dark:shadow-none">
      <div className="mb-3 flex items-center gap-3 px-2">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">目次</p>
        <span className="h-px flex-1 bg-paper-border dark:bg-gray-700" aria-hidden="true" />
      </div>
      <TocLinks toc={toc} />
    </aside>
  )
}
