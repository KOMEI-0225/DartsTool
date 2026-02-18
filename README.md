# 🎯 DartsTool - ダーツ得点計算ツール

ダーツの得点を簡単に計算できるウェブアプリケーションです。

## 機能

- **01ゲーム**: 301/501/701/901から0を目指すゲーム
- **カウントアップ**: 8ラウンドでの合計点数を競うゲーム
- **クリケット**: クリケットゲーム（簡易版）
- **投球履歴**: 各ラウンドの記録を表示
- **日本語対応**: 完全な日本語インターフェース

## ローカルでの実行方法

### シンプルな方法（Pythonを使用）
```bash
python3 -m http.server 8000
```
ブラウザで `http://localhost:8000` にアクセス

### npmを使用
```bash
npm start
```

## Cloudflare Pagesへのデプロイ方法

このアプリケーションは静的サイトなので、Cloudflare Pagesで簡単にデプロイできます。

### 手順

1. [Cloudflare Pages](https://pages.cloudflare.com/) にアクセス
2. GitHubアカウントでログイン
3. "Create a project" をクリック
4. "Connect to Git" を選択
5. このリポジトリ（KOMEI-0225/DartsTool）を選択
6. ビルド設定:
   - **Build command**: `echo "No build needed"`（または空白）
   - **Build output directory**: `/`（ルートディレクトリ）
7. "Save and Deploy" をクリック

数分でデプロイが完了し、`https://your-project.pages.dev` のようなURLでアクセスできます。

## その他のデプロイオプション

### Netlify
1. [Netlify](https://www.netlify.com/) にアクセス
2. "Add new site" → "Import an existing project"
3. GitHubからこのリポジトリを選択
4. Build settings:
   - Build command: （空白）
   - Publish directory: `/`

### Vercel
1. [Vercel](https://vercel.com/) にアクセス
2. "New Project" をクリック
3. GitHubからこのリポジトリをインポート
4. そのままデプロイ（設定不要）

### GitHub Pages
1. リポジトリの Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main` / `root` を選択
4. Save

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript
- UTF-8エンコーディング（日本語完全対応）

## ライセンス

MIT License

## 作者

KOMEI-0225
