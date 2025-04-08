FROM node:20-alpine AS base

WORKDIR /app

# 必要なビルドツールとPythonをインストール
RUN apk add --no-cache python3 make g++ git

# npmをアップデート
RUN npm install -g npm@latest

# 最初に依存関係をインストールするための準備段階
FROM base AS deps
WORKDIR /app

# 依存関係をコピー
COPY package*.json ./

# 本番依存関係のみインストール
RUN npm install --only=production --legacy-peer-deps

# 開発依存関係も含む完全なインストール
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ここで必要な開発依存関係を追加インストール
RUN npm install --no-save typescript@^5.8.2 @types/node@^22.13.11 @types/react@19.0.12

# 最終イメージ
FROM base AS runner
WORKDIR /app

# 本番依存関係のみコピー
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app ./

# ポートを公開
EXPOSE 3000 4111

# 環境変数を設定
ENV NODE_ENV=development
ENV PYTHON=/usr/bin/python3

# コンテナ起動時に実行するコマンド
CMD ["npm", "run", "docker:start"]