export const POSTS_PER_PAGE = 5

// Contentlayer が検証した記事の日付を、日時へ変換せず YYYY.MM.DD に整形する。
export function formatPostDate(value: string) {
  return value.slice(0, 10).replaceAll('-', '.')
}
