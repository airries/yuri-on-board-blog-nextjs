export const POSTS_PER_PAGE = 5

//: 記事日付の表示書式。一覧・記事・レイアウトで同じ見え方にするため定義はここだけ
export const POST_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}
