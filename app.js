/**
 * ダーツアレンジクイズ アプリケーションロジック
 */

// ===== 状態管理 =====
let currentMultiplier = 1;
let currentInputs = [];       // 入力済みのダーツ [{label, value}]
let currentQuizScore = null;   // 現在の問題スコア
let correctCount = 0;
let totalCount = 0;
let quizHistory = [];          // 出題済みスコア
let isAnswered = false;

// ===== 初期化 =====
document.addEventListener("DOMContentLoaded", function () {
    nextQuiz();
});

// ===== クイズ管理 =====
function nextQuiz() {
    isAnswered = false;
    currentInputs = [];
    currentMultiplier = 1;

    // 結果エリアを非表示
    document.getElementById("result-area").classList.add("hidden");
    document.getElementById("app").classList.remove("keyboard-hidden");

    // 倍率リセット
    updateMultiplierUI();
    updateInputDisplay();

    // まだ出題していないスコアからランダムに選択
    var available = QUIZ_SCORES.filter(function (s) {
        return quizHistory.indexOf(s) === -1;
    });

    // 全部出題済みならリセット
    if (available.length === 0) {
        quizHistory = [];
        available = QUIZ_SCORES.slice();
    }

    var idx = Math.floor(Math.random() * available.length);
    currentQuizScore = available[idx];
    quizHistory.push(currentQuizScore);

    // 表示更新
    document.getElementById("remaining-score").textContent = currentQuizScore;

    var arrangement = ARRANGEMENTS[currentQuizScore];
    if (arrangement) {
        document.getElementById("route-count").textContent = arrangement.routes.length;
    }
}

// ===== 倍率キー =====
function setMultiplier(m) {
    if (isAnswered) return;
    currentMultiplier = m;
    updateMultiplierUI();
    updateCurrentInputLabel();
}

function updateMultiplierUI() {
    var btns = document.querySelectorAll(".multiplier-key");
    for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];
        if (parseInt(btn.getAttribute("data-multiplier")) === currentMultiplier) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    }
}

// ===== 数字入力 =====
function inputNumber(num) {
    if (isAnswered) return;

    var label;
    if (currentMultiplier === 1) {
        label = "S" + num;
    } else if (currentMultiplier === 2) {
        label = "D" + num;
    } else {
        label = "T" + num;
    }

    var value = num * currentMultiplier;
    currentInputs.push({ label: label, value: value });

    // 倍率を×1にリセット
    currentMultiplier = 1;
    updateMultiplierUI();
    updateInputDisplay();
}

// ===== ブル入力 =====
function inputBull() {
    if (isAnswered) return;

    if (currentMultiplier === 2 || currentMultiplier === 1) {
        // ×2でBULLを押す → ダブルブル (D-BULL, 50点)
        // ×1でBULLを押す → アウターブル (BULL, 25点)
        if (currentMultiplier === 2) {
            currentInputs.push({ label: "D-BULL", value: 50 });
        } else {
            currentInputs.push({ label: "BULL", value: 25 });
        }
    } else {
        // ×3でBULLは無効（トリプルブルは存在しない）
        return;
    }

    currentMultiplier = 1;
    updateMultiplierUI();
    updateInputDisplay();
}

// ===== 入力取消 =====
function undoInput() {
    if (isAnswered) return;
    if (currentInputs.length > 0) {
        currentInputs.pop();
        updateInputDisplay();
    }
}

// ===== 入力表示更新 =====
function updateInputDisplay() {
    var historyEl = document.getElementById("input-history");
    historyEl.innerHTML = "";

    for (var i = 0; i < currentInputs.length; i++) {
        var tag = document.createElement("span");
        tag.className = "input-tag";
        tag.textContent = currentInputs[i].label;
        historyEl.appendChild(tag);
    }

    updateCurrentInputLabel();
}

function updateCurrentInputLabel() {
    var el = document.getElementById("current-input");
    if (currentInputs.length === 0) {
        el.textContent = "ダーツを入力してください";
    } else {
        var total = 0;
        for (var i = 0; i < currentInputs.length; i++) {
            total += currentInputs[i].value;
        }
        var remaining = currentQuizScore - total;
        if (remaining > 0) {
            el.textContent = "残り: " + remaining;
        } else {
            el.textContent = "回答ボタンを押してください";
        }
    }
}

// ===== 回答チェック =====
function submitAnswer() {
    if (isAnswered) return;
    if (currentInputs.length === 0) return;

    var arrangement = ARRANGEMENTS[currentQuizScore];
    if (!arrangement) return;

    // 入力されたラベル列を作成
    var inputLabels = [];
    for (var i = 0; i < currentInputs.length; i++) {
        inputLabels.push(currentInputs[i].label);
    }

    // 合計値チェック
    var inputTotal = 0;
    for (var j = 0; j < currentInputs.length; j++) {
        inputTotal += currentInputs[j].value;
    }

    if (inputTotal !== currentQuizScore) {
        showResult(false, arrangement, inputLabels);
        return;
    }

    // 最後のダーツがダブルかチェック
    var lastLabel = inputLabels[inputLabels.length - 1];
    if (lastLabel.indexOf("D") !== 0) {
        showResult(false, arrangement, inputLabels);
        return;
    }

    // 正解ルートとの一致チェック（順序も含めて）
    var isCorrect = false;
    for (var r = 0; r < arrangement.routes.length; r++) {
        var route = arrangement.routes[r];
        if (route.length !== inputLabels.length) continue;

        var match = true;
        for (var k = 0; k < route.length; k++) {
            if (route[k] !== inputLabels[k]) {
                match = false;
                break;
            }
        }
        if (match) {
            isCorrect = true;
            break;
        }
    }

    showResult(isCorrect, arrangement, inputLabels);
}

// ===== 結果表示 =====
function showResult(isCorrect, arrangement, inputLabels) {
    isAnswered = true;
    totalCount++;

    if (isCorrect) {
        correctCount++;
    }

    // スコア更新
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("total-count").textContent = totalCount;

    // キーボード非表示
    document.getElementById("app").classList.add("keyboard-hidden");

    // 結果表示
    var resultArea = document.getElementById("result-area");
    resultArea.classList.remove("hidden");

    document.getElementById("result-icon").textContent = isCorrect ? "🎉" : "😢";
    document.getElementById("result-text").textContent = isCorrect ? "正解！" : "不正解...";
    document.getElementById("result-text").style.color = isCorrect ? "#4ecca3" : "#e94560";

    // 正解ルートを全て表示
    var answerHtml = "【正解ルート】\n";
    for (var i = 0; i < arrangement.routes.length; i++) {
        answerHtml += (i + 1) + ". " + arrangement.routes[i].join(" → ") + "\n";
    }
    if (!isCorrect) {
        answerHtml += "\n【あなたの回答】\n" + inputLabels.join(" → ");
    }
    var answerEl = document.getElementById("result-answer");
    answerEl.textContent = answerHtml;
    answerEl.style.whiteSpace = "pre-line";

    // Tip表示
    document.getElementById("result-tip").textContent = "💡 " + arrangement.tip;
}
