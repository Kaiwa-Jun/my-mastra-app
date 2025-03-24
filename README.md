# カメラ初心者サポートアプリ

AIがカメラ初心者に最適なカメラ設定を提案するアプリケーションです。

## 機能

- 画像アップロードによるシーン自動認識
- シーンに合わせた最適なカメラ設定推奨（ISO感度、F値、シャッタースピードなど）
- AIエージェントによるカメラ設定アドバイス

## 技術スタック

- Next.js (App Router)
- mastra（AIエージェントフレームワーク）
- Supabase (認証・データベース・ストレージ)
- Docker & Docker Compose

## 開発環境セットアップ

### Dockerを使用する場合（推奨）

1. リポジトリをクローン

   ```
   git clone <リポジトリURL>
   cd my-mastra-app
   ```

2. 環境変数ファイルを設定

   - `.env.local` - Supabaseの接続情報
   - `.env.development` - AIサービスのAPI情報

3. Dockerイメージをビルド

   ```
   npm run docker:build
   ```

4. Docker環境を起動

   ```
   npm run docker:up
   ```

5. 以下のURLでアプリケーションにアクセス

   - Next.js: http://localhost:3000
   - mastra AI: http://localhost:4111

6. Docker環境を停止
   ```
   npm run docker:down
   ```

### 従来のセットアップ（Docker不使用）

1. 依存関係のインストール

   ```
   npm install
   ```

2. mastraアプリケーションの起動（ポート4111）

   ```
   npm run dev:mastra
   ```

3. 別ターミナルでNext.jsアプリケーションの起動（ポート3000）
   ```
   npm run dev:next
   ```

## ディレクトリ構造

```
src/
  mastra/        - AIエージェント関連
    agents/      - AIエージェント定義
    tools/       - AIツール
    data/        - 設定データ
  app/           - Next.js (App Router)
    api/         - APIエンドポイント
    components/  - UIコンポーネント
    lib/         - 共通ライブラリ
```

## Dockerコマンド一覧

- `npm run docker:build` - Dockerイメージをビルド
- `npm run docker:up` - Docker環境を起動
- `npm run docker:down` - Docker環境を停止および削除
