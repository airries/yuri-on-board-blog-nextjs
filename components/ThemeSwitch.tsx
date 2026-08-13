'use client'

import { Fragment, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

const Sun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)

const Moon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)

const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2" />
    <line x1="7" y1="17" x2="13" y2="17" />
    <line x1="10" y1="13" x2="10" y2="17" />
  </svg>
)

const Blank = () => <svg className="h-6 w-6" />

// テーマは選ぶと即座に確定するのでメニュー項目として扱う。RadioGroup で包むと
// menuitem と radio の role が二重になる。
const THEMES = [
  { value: 'light', label: 'ライト', Icon: Sun },
  { value: 'dark', label: 'ダーク', Icon: Moon },
  { value: 'system', label: 'システム', Icon: Monitor },
] as const

const subscribe = () => () => undefined

const ThemeSwitch = () => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className="mr-5 flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="テーマを切り替える">
            {mounted ? resolvedTheme === 'dark' ? <Moon /> : <Sun /> : <Blank />}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-lg bg-white p-1 ring-1 ring-black/5 focus:outline-none dark:bg-gray-800 dark:ring-white/10">
            {THEMES.map(({ value, label, Icon }) => (
              <MenuItem key={value}>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={() => setTheme(value)}
                    aria-current={theme === value}
                    className={`${focus ? 'bg-primary-500 text-white' : ''} ${
                      theme === value ? 'font-medium' : ''
                    } flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                  >
                    <Icon />
                    {label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
