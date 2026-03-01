# Pokemon App（React × TypeScript）
React × TypeScript で構築した型安全なSPAアプリケーション

## 🔗 デモ

https://react-type-app-pokemon.vercel.app/

---

## 📝 概要

PokeAPI を利用したポケモン一覧表示アプリです。  
ページネーション機能を実装し、ページ遷移時にフェードアニメーションを加えることでUX向上を意識しました。

React × TypeScript による型安全な実装と、カスタムフックによる責務分離を意識した設計を行っています。

---

## 🚀 使用技術

- React 19
- TypeScript
- SCSS Modules
- Fetch API
- PokeAPI
- Vercel（GitHub連携による自動デプロイ）

---

## 🏗 設計・実装のポイント

### ① カスタムフックによる責務分離

API取得およびページネーションロジックは  
`usePokemonPagination` に切り出しています。

UIとデータ取得ロジックを分離することで：

- コンポーネントの責務明確化
- 再利用性の向上
- 可読性の向上

を意識しました。

---

### ② 非同期処理の並列実行

ポケモン詳細データ取得時に `Promise.all` を使用し、  
複数APIリクエストを並列実行しています。

これにより表示速度の最適化を図っています。

---

### ③ 状態管理の整理

以下の状態を用途ごとに分離しています。

| state名 | 役割 |
|---------|------|
| loading | API取得中の状態管理 |
| error | エラー管理 |
| pokemonData | 表示用データ |
| nextURL / prevURL | ページネーション制御 |
| isFading | アニメーション制御 |

将来的には、お気に入り機能などの追加を想定し、  
Global State 管理（Zustand等）の導入も検討しています。

---

### ④ UX向上のためのアニメーション制御

ページ切替時にフェードアウト → フェードインを実装しています。

単純なページ更新ではなく、体験設計を意識しました。

---

### ⑤ 型安全性の確保

APIレスポンスの型定義を明示的に行っています。

これにより：

- 型補完による開発効率向上
- バグの未然防止
- 拡張時の安全性確保

を実現しています。

---

## 📂 ディレクトリ構成

src
├── component
│ ├── Card
│ ├── Navbar
│ └── SkeletonCard
├── hooks
│ └── usePokemonPagination.ts
├── utils
│ └── pokemon.ts
└── App.tsx


責務ごとにディレクトリを分離しています。

---

## 🔮 今後の改善予定

- AbortControllerによるリクエストキャンセル対応
- APIレスポンスのキャッシュ導入
- Global State 管理の導入
- テストコードの拡充
- レスポンシブデザインの強化

---

## 👨‍💻 作成者

Teruo Fujikake
