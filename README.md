# Othello App

MCTSで構築されたAIと対戦できるアプリ

## 環境構築

パッケージマネージャは [yarn](https://yarnpkg.com/) を使います

``` bash
$ yarn install
```

依存関係を取得したら

``` bash
$ yarn dev
```

サーバーを建てて開発を開始できます

## Linter

このプロジェクトでは

- [ESLint](https://eslint.org/)
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)

を利用します

以下のように使用します

``` bash
$ yarn lint  # コードチェック
$ yarn fix   # 自動修正
```

## ルーティング

このプロジェクトでは、ルーティングを静的に検査できる [aspida/pathpida](https://github.com/aspida/pathpida) を導入しています

`src/lib/$path.ts` に定義されている `pagesPath` にルーティング型が定義されているので、以下のようにして型安全にリンクを貼ることができます

``` tsx:sample.tsx
import Link from "next/link"
import { pagesPath } from "@path"

<Link href={pagesPath.$url()}>click me</Link>
```

## Github 運用

- ブランチ運用は [Github Flow](https://guides.github.com/introduction/flow/#:~:text=GitHub%20flow%20is%20a%20lightweight,where%20deployments%20are%20made%20regularly.) に従う
- コミットメッセージ, Issue, プルリクは日本語で統一

## モック画面

[今回のオセロゲームのモック画面](https://whimsical.com/WSpn3uDY2eU71b6HdbXSTY)
