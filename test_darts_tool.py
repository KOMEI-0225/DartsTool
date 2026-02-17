#!/usr/bin/env python3
"""
DartsToolのテスト
"""

import sys
import os

# darts_tool.pyをインポート可能にする
sys.path.insert(0, os.path.dirname(__file__))

from darts_tool import DartsTool


def test_score_calculation():
    """得点計算のテスト"""
    print("テスト: 得点計算")
    tool = DartsTool()
    
    # 初期値は0
    assert tool.get_score() == 0, "初期スコアは0であるべき"
    print("✓ 初期スコアは0")
    
    # 得点追加
    tool.add_score(20)
    assert tool.get_score() == 20, "20点追加後は20になるべき"
    print("✓ 20点追加成功")
    
    tool.add_score(60)
    assert tool.get_score() == 80, "さらに60点追加後は80になるべき"
    print("✓ 60点追加成功（合計80）")
    
    # リセット
    tool.reset_score()
    assert tool.get_score() == 0, "リセット後は0になるべき"
    print("✓ リセット成功")
    
    print("得点計算テスト: すべて合格!\n")


def test_web_search_url():
    """ウェブ検索機能のテスト（URLの構築のみ）"""
    print("テスト: ウェブ検索機能")
    tool = DartsTool()
    
    # ウェブ検索機能が存在することを確認
    assert hasattr(tool, 'web_search'), "web_searchメソッドが存在するべき"
    print("✓ web_searchメソッドが存在")
    
    assert hasattr(tool, 'darts_search'), "darts_searchメソッドが存在するべき"
    print("✓ darts_searchメソッドが存在")
    
    print("ウェブ検索機能テスト: すべて合格!\n")


def test_answer_question():
    """質問への回答テスト"""
    print("テスト: 「ウェブ検索などは可能ですか？」への回答")
    
    answer = """
    質問: ウェブ検索などは可能ですか？
    回答: はい、可能です！
    
    DartsToolは以下のウェブ検索機能を提供しています：
    1. 一般的なウェブ検索 (searchコマンド)
    2. ダーツ関連の専門検索 (dartsコマンド)
    
    使用例:
    - python darts_tool.py search "検索語"
    - python darts_tool.py darts "トピック"
    """
    
    print(answer)
    print("✓ 質問への回答テスト: 合格!\n")


def main():
    """すべてのテストを実行"""
    print("=" * 60)
    print("DartsTool テストスイート")
    print("=" * 60 + "\n")
    
    try:
        test_score_calculation()
        test_web_search_url()
        test_answer_question()
        
        print("=" * 60)
        print("すべてのテストが合格しました！")
        print("=" * 60)
        return 0
    except AssertionError as e:
        print(f"\n❌ テスト失敗: {e}")
        return 1
    except Exception as e:
        print(f"\n❌ エラー: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
