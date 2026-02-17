#!/usr/bin/env python3
"""
DartsTool - ダーツツール
ダーツの得点計算とウェブ検索機能
"""

import sys
import webbrowser
import urllib.parse


class DartsTool:
    """ダーツツールのメインクラス"""
    
    def __init__(self):
        self.score = 0
        
    def add_score(self, points):
        """得点を追加"""
        self.score += points
        return self.score
    
    def reset_score(self):
        """得点をリセット"""
        self.score = 0
        
    def get_score(self):
        """現在の得点を取得"""
        return self.score
    
    def web_search(self, query):
        """ウェブ検索を実行
        
        Args:
            query (str): 検索クエリ
            
        Returns:
            bool: 検索が成功したかどうか
        """
        try:
            # Google検索のURLを構築
            search_url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
            
            # デフォルトのブラウザで検索を開く
            webbrowser.open(search_url)
            
            print(f"ウェブ検索を開始: {query}")
            return True
        except Exception as e:
            print(f"エラー: ウェブ検索に失敗しました - {e}")
            return False
    
    def darts_search(self, topic=""):
        """ダーツ関連のウェブ検索を実行
        
        Args:
            topic (str): 検索トピック（空の場合は一般的なダーツ検索）
            
        Returns:
            bool: 検索が成功したかどうか
        """
        if topic:
            query = f"ダーツ {topic}"
        else:
            query = "ダーツ"
            
        return self.web_search(query)


def print_help():
    """ヘルプメッセージを表示"""
    help_text = """
DartsTool - ダーツツール

使い方:
    python darts_tool.py score <点数>    # 得点を追加
    python darts_tool.py reset           # 得点をリセット
    python darts_tool.py search <検索語> # ウェブ検索を実行
    python darts_tool.py darts <トピック> # ダーツ関連の検索
    python darts_tool.py help            # このヘルプを表示

例:
    python darts_tool.py score 180       # 180点を追加
    python darts_tool.py search "ダーツ ルール"
    python darts_tool.py darts "トーナメント"
    
ウェブ検索機能: はい、可能です！
    - 一般的なウェブ検索
    - ダーツ関連の専門検索
    """
    print(help_text)


def main():
    """メイン関数"""
    if len(sys.argv) < 2:
        print_help()
        return
    
    tool = DartsTool()
    command = sys.argv[1].lower()
    
    if command == "help":
        print_help()
    elif command == "score" and len(sys.argv) >= 3:
        try:
            points = int(sys.argv[2])
            total = tool.add_score(points)
            print(f"得点を追加: {points} -> 合計: {total}")
        except ValueError:
            print("エラー: 有効な数値を入力してください")
    elif command == "reset":
        tool.reset_score()
        print("得点をリセットしました")
    elif command == "search" and len(sys.argv) >= 3:
        query = " ".join(sys.argv[2:])
        tool.web_search(query)
    elif command == "darts":
        topic = " ".join(sys.argv[2:]) if len(sys.argv) >= 3 else ""
        tool.darts_search(topic)
    else:
        print("エラー: 無効なコマンドです")
        print_help()


if __name__ == "__main__":
    main()
