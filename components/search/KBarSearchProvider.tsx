'use client'

import { formatPostDate } from '@/data/blogConfig'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
  useRegisterActions,
  type Action,
} from 'kbar'
import { useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'

interface SearchDocument {
  date: string
  path: string
  summary?: string
  title: string
}

function SearchResults({ loading }: { loading: boolean }) {
  const { results } = useMatches()

  if (loading) {
    return (
      <p className="border-t border-paper-border px-5 py-10 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        記事を読み込んでいます…
      </p>
    )
  }

  if (results.length === 0) {
    return (
      <p className="border-t border-paper-border px-5 py-10 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        一致する記事が見つかりませんでした
      </p>
    )
  }

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="border-t border-paper-border px-5 pt-5 pb-2 text-xs font-semibold tracking-[0.14em] text-gray-500 uppercase dark:border-gray-800 dark:text-gray-400">
            {item}
          </div>
        ) : (
          <div
            className={`mx-2 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors ${
              active
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-200'
                : 'text-gray-800 dark:text-gray-100'
            }`}
          >
            <time
              className={`shrink-0 text-xs tabular-nums ${
                active ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {item.subtitle}
            </time>
            <span className="min-w-0 font-medium">{item.name}</span>
          </div>
        )
      }
    />
  )
}

function SearchModal({ actions, loading }: { actions: Action[]; loading: boolean }) {
  useRegisterActions(actions, [actions])

  return (
    <KBarPortal>
      <KBarPositioner className="z-60 bg-gray-900/30 p-4 backdrop-blur-sm dark:bg-black/60">
        <KBarAnimator className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-paper-border bg-paper shadow-xl shadow-gray-900/10 dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/30">
            <div className="flex items-center gap-3 px-5 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z"
                />
              </svg>
              <KBarSearch
                aria-label="記事を検索"
                defaultPlaceholder="記事を検索…"
                className="h-9 w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              <kbd className="rounded-md border border-paper-border bg-paper-panel px-2 py-1 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                ESC
              </kbd>
            </div>
            <SearchResults loading={loading} />
            <p className="border-t border-paper-border px-5 py-3 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
              ↑↓で選択・Enterで開く
            </p>
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

export default function KBarSearchProvider({
  children,
  searchDocumentsPath,
}: {
  children: ReactNode
  searchDocumentsPath: string
}) {
  const router = useRouter()
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadSearchDocuments() {
      try {
        const response = await fetch(searchDocumentsPath, { signal: controller.signal })
        if (!response.ok) throw new Error(`Search index request failed: ${response.status}`)
        const documents = (await response.json()) as SearchDocument[]

        setActions(
          documents.map((post) => ({
            id: post.path,
            name: post.title,
            keywords: post.summary ?? '',
            section: '記事',
            subtitle: formatPostDate(post.date),
            perform: () => router.push(`/${post.path}`),
          }))
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadSearchDocuments()
    return () => controller.abort()
  }, [router, searchDocumentsPath])

  return (
    <KBarProvider>
      <SearchModal actions={actions} loading={loading} />
      {children}
    </KBarProvider>
  )
}
