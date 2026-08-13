'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

// 背面のスクロール抑止は Dialog が html に overflow:hidden を当てて行うので、
// ここでスクロールロックを自前実装しない。
const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const closeNav = () => setNavShow(false)

  return (
    <>
      <button
        aria-label="メニューを開く"
        onClick={() => setNavShow(true)}
        className="hover:text-primary-500 sm:hidden dark:hover:text-primary-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog as="div" className="relative z-60" onClose={closeNav}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-250"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 right-0 z-70 w-full max-w-xs bg-paper p-8 dark:bg-gray-950">
              <div className="flex justify-end">
                <button
                  className="-mt-2 -mr-2 h-10 w-10 p-2 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                  aria-label="メニューを閉じる"
                  onClick={closeNav}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <nav className="mt-6 flex flex-col gap-1">
                {headerNavLinks
                  .filter((link) => link.href !== '/')
                  .map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-xl font-medium tracking-wide text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                      onClick={closeNav}
                    >
                      {link.title}
                    </Link>
                  ))}
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
