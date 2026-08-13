'use client'

import { type ReactNode, useCallback, useId, useState, useSyncExternalStore } from 'react'

const getServerHashSnapshot = () => false

interface AnimatedDisclosureProps {
  title: string
  children: ReactNode | ((open: boolean) => ReactNode)
  defaultOpen?: boolean
  className?: string
  openHash?: string
}

export default function AnimatedDisclosure({
  title,
  children,
  defaultOpen = false,
  className = '',
  openHash,
}: AnimatedDisclosureProps) {
  const [localOpen, setLocalOpen] = useState(defaultOpen)
  const panelId = useId()

  const subscribeToHash = useCallback(
    (onChange: () => void) => {
      if (!openHash) return () => undefined
      window.addEventListener('hashchange', onChange)
      return () => window.removeEventListener('hashchange', onChange)
    },
    [openHash]
  )

  const getHashSnapshot = useCallback(
    () => Boolean(openHash && window.location.hash === `#${openHash}`),
    [openHash]
  )
  const hashOpen = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot)
  const open = openHash ? hashOpen : localOpen

  const toggle = () => {
    if (!openHash) {
      setLocalOpen((current) => !current)
      return
    }

    const url = new URL(window.location.href)
    url.hash = open ? '' : openHash
    window.history.replaceState(window.history.state, '', url)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }

  const content = typeof children === 'function' ? children(open) : children

  return (
    <section
      className={`rounded-xl border border-paper-border bg-paper-panel/55 px-4 dark:border-gray-800 dark:bg-gray-900/60 ${className}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400"
      >
        <span>{title}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`}
        >
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={panelId}
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-4">{content}</div>
        </div>
      </div>
    </section>
  )
}
