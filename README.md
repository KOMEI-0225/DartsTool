# DartsTool
・ダーツの得点計算
・ウェブ検索機能

## 機能

### ウェブ検索は可能ですか？
**はい、可能です！**

このツールは以下の機能を提供します：
1. ダーツの得点計算
2. ウェブ検索（一般検索）
3. ダーツ関連の専門検索

## 使い方

### インストール
```bash
# Pythonの標準ライブラリのみを使用しているため、追加のインストールは不要です
```

### 基本コマンド

#### 得点計算
```bash
python darts_tool.py score 180    # 180点を追加
python darts_tool.py reset        # 得点をリセット
```

#### ウェブ検索
```bash
# 一般的なウェブ検索
python darts_tool.py search "ダーツ ルール"

# ダーツ関連の専門検索
python darts_tool.py darts "トーナメント"
python darts_tool.py darts          # 一般的なダーツ情報
```

#### ヘルプ
```bash
python darts_tool.py help
```

## ウェブ検索機能の詳細

ウェブ検索機能は、デフォルトのブラウザを使用してGoogle検索を実行します：
- `search` コマンド: 任意の検索クエリを実行
- `darts` コマンド: ダーツ関連の検索を実行（自動的に「ダーツ」キーワードを追加）

検索結果はブラウザで表示されます。

## 必要要件
- Python 3.x
- デフォルトのウェブブラウザ

## ライセンス
MIT License
