// contentlayer を Next のビルドパイプラインから切り離して動かす。
//
// next-contentlayer2 の withContentlayer は webpack プラグインとして再生成を仕掛けるため、
// Turbopack では動かない (dev サーバーは起動するが .mdx を編集しても反映されない)。
// 監視プロセスを別に立てれば Turbopack のまま content の変更に追随できる。
import { spawn } from 'node:child_process'

// shell: true に配列で引数を渡すと Node が DEP0190 を出す (連結されるだけで
// エスケープされないため)。コマンドは 1 本の文字列で渡す。
const children = [
  spawn('npx contentlayer2 dev', { stdio: 'inherit', shell: true }),
  spawn('npx next dev --turbopack', { stdio: 'inherit', shell: true }),
]

const stopAll = (code) => {
  for (const child of children) {
    if (!child.killed) child.kill()
  }
  process.exit(code ?? 0)
}

// どちらかが落ちたら、もう片方も残さない
for (const child of children) {
  child.on('exit', (code) => stopAll(code ?? 0))
}
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => stopAll(0))
}
