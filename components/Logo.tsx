import type { SVGProps } from 'react'

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="344.5639 330.2782 111.7368 91.218"
      width="53.87"
      height="43.61"
      role="img"
      aria-label="Yuri on Board"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient-right" x1="420.97" y1="331.28" x2="420.97" y2="418.5">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="logo-gradient-left" x1="377.89" y1="331.28" x2="377.89" y2="418.5">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      <path d="M453.3 331.28v28.57l-64.66 58.65v-30.08z" fill="url(#logo-gradient-right)" />
      <path d="M410.23 331.28v28.57l-64.67 58.65v-30.08z" fill="url(#logo-gradient-left)" />
    </svg>
  )
}
