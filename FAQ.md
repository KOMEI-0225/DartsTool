# よくある質問 (FAQ)

## ウェブ検索などは可能ですか？

**はい、可能です！**

DartsToolは、ウェブ検索機能を搭載しています。

### 利用可能な検索機能

1. **一般的なウェブ検索**
   ```bash
   python darts_tool.py search "検索したい内容"
   ```
   例: `python darts_tool.py search "ダーツ ルール"`

2. **ダーツ関連の専門検索**
   ```bash
   python darts_tool.py darts "トピック"
   ```
   例: `python darts_tool.py darts "トーナメント"`

### 検索の仕組み

- デフォルトのウェブブラウザが自動的に開きます
- Google検索を使用して結果を表示します
- インターネット接続が必要です

### 使用例

```bash
# ダーツのルールを検索
python darts_tool.py search "ダーツ ルール"

# ダーツのトーナメント情報を検索
python darts_tool.py darts "トーナメント"

# 一般的なダーツ情報を検索
python darts_tool.py darts
```

### その他の機能

DartsToolは検索機能だけでなく、以下の機能も提供しています：

- **得点計算**: `python darts_tool.py score <点数>`
- **得点リセット**: `python darts_tool.py reset`
- **ヘルプ表示**: `python darts_tool.py help`

## その他の質問

### Python 3がインストールされていない場合は？

Python 3.xが必要です。以下のコマンドでインストールされているか確認できます：

```bash
python3 --version
```

### ブラウザが開かない場合は？

- デフォルトのブラウザが設定されていることを確認してください
- インターネット接続を確認してください
- ファイアウォールやセキュリティソフトがブラウザの起動をブロックしていないか確認してください

### 追加のパッケージは必要ですか？

いいえ、DartsToolはPythonの標準ライブラリのみを使用しているため、追加のパッケージインストールは不要です。
