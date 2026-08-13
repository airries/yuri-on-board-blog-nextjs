import type { SVGProps } from 'react'

// クローン元 (tailwind-nextjs-starter-blog) のグラデーションロゴを、
// ライセンス不要な自作の文字ロゴに置き換えたもの。色は currentColor と
// primary の CSS 変数を使うのでダーク/ライトを自動追従する。
export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 168 32" height="28" role="img" aria-label="Yuri on Board" {...props}>
      <text
        x="0"
        y="23"
        fontFamily="var(--font-sans)"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.01em"
        fill="currentColor"
      >
        YURI
      </text>
      <rect x="76" y="10" width="8" height="8" rx="2" fill="var(--color-primary-500)" />
      <text
        x="94"
        y="23"
        fontFamily="var(--font-sans)"
        fontSize="22"
        fontWeight="400"
        letterSpacing="-0.01em"
        fill="currentColor"
        opacity="0.7"
      >
        on board
      </text>
    </svg>
  )
}
