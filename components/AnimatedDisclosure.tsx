'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import type { ReactNode } from 'react'

interface AnimatedDisclosureProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export default function AnimatedDisclosure({
  title,
  children,
  defaultOpen = false,
  className = '',
}: AnimatedDisclosureProps) {
  return (
    <Disclosure
      as="section"
      defaultOpen={defaultOpen}
      className={`rounded-xl border border-paper-border bg-paper-panel/55 px-4 dark:border-gray-800 dark:bg-gray-900/60 ${className}`}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400">
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
          </DisclosureButton>
          <DisclosurePanel
            static
            aria-hidden={!open}
            inert={!open}
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
              open
                ? 'grid-rows-[1fr] opacity-100'
                : 'pointer-events-none grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="pb-4">{children}</div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
