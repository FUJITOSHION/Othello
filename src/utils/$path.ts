/* eslint-disable */
export const pagesPath = {
  game: {
    $url: (url?: { hash?: string }) => ({ pathname: '/game' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
