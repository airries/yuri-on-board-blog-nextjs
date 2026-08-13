import Link from './Link'

export default function RSSButton() {
  return (
    <Link
      href="/feed.xml"
      aria-label="RSSフィード"
      className="flex h-8 w-8 items-center justify-center text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 5a15 15 0 0 1 15 15" />
      </svg>
    </Link>
  )
}
