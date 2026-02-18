// ダーツ得点計算ツール - Darts Score Calculator
// Game state
let gameState = {
    mode: '01',
    targetScore: 501,
    currentScore: 501,
    round: 1,
    history: []
};

// DOM elements
const gameModeSelect = document.getElementById('gameMode');
const targetScoreSelect = document.getElementById('targetScore');
const targetScoreSection = document.getElementById('targetScoreSection');
const currentScoreDisplay = document.getElementById('currentScore');
const roundNumberDisplay = document.getElementById('roundNumber');
const dart1Input = document.getElementById('dart1');
const dart2Input = document.getElementById('dart2');
const dart3Input = document.getElementById('dart3');
const submitButton = document.getElementById('submitRound');
const resetButton = document.getElementById('resetGame');
const historyDiv = document.getElementById('history');

// Initialize game
function initGame() {
    gameState.mode = gameModeSelect.value;
    gameState.targetScore = parseInt(targetScoreSelect.value);
    
    // Set initial score based on game mode
    if (gameState.mode === '01') {
        gameState.currentScore = gameState.targetScore;
    } else {
        gameState.currentScore = 0;
    }
    
    gameState.round = 1;
    gameState.history = [];
    
    updateDisplay();
    clearInputs();
    updateHistory();
}

// Update display
function updateDisplay() {
    currentScoreDisplay.textContent = gameState.currentScore;
    roundNumberDisplay.textContent = gameState.round;
}

// Clear input fields
function clearInputs() {
    dart1Input.value = '';
    dart2Input.value = '';
    dart3Input.value = '';
    dart1Input.focus();
}

// Update history display
function updateHistory() {
    if (gameState.history.length === 0) {
        historyDiv.innerHTML = '<p class="empty-message">まだ記録がありません</p>';
        return;
    }
    
    let historyHTML = '';
    gameState.history.slice().reverse().forEach((item, index) => {
        const actualRound = gameState.history.length - index;
        historyHTML += `
            <div class="history-item">
                <div class="round-info">ラウンド ${actualRound}</div>
                <div class="darts-info">
                    1投目: ${item.dart1}, 2投目: ${item.dart2}, 3投目: ${item.dart3}
                </div>
                <div class="round-total">合計: ${item.total} | 残り: ${item.remaining}</div>
            </div>
        `;
    });
    
    historyDiv.innerHTML = historyHTML;
}

// Submit round
function submitRound() {
    const dart1 = parseInt(dart1Input.value) || 0;
    const dart2 = parseInt(dart2Input.value) || 0;
    const dart3 = parseInt(dart3Input.value) || 0;
    
    // Validate input
    if (dart1 < 0 || dart1 > 60 || dart2 < 0 || dart2 > 60 || dart3 < 0 || dart3 > 60) {
        alert('各投球の得点は0から60の間で入力してください');
        return;
    }
    
    const roundTotal = dart1 + dart2 + dart3;
    
    if (gameState.mode === '01') {
        // 01 game logic - simplified version
        // Note: This implementation allows simple subtraction to zero
        // A more advanced version would require finishing on a double
        const newScore = gameState.currentScore - roundTotal;
        
        if (newScore < 0) {
            alert('バースト！得点が0を下回りました。次のラウンドへ。');
            gameState.round++;
        } else if (newScore === 0) {
            // Winner!
            gameState.currentScore = 0;
            gameState.history.push({
                round: gameState.round,
                dart1: dart1,
                dart2: dart2,
                dart3: dart3,
                total: roundTotal,
                remaining: 0
            });
            
            updateDisplay();
            updateHistory();
            showWinner();
            return;
        } else {
            gameState.currentScore = newScore;
            gameState.round++;
        }
        
        gameState.history.push({
            round: gameState.round - 1,
            dart1: dart1,
            dart2: dart2,
            dart3: dart3,
            total: roundTotal,
            remaining: gameState.currentScore
        });
    } else if (gameState.mode === 'count-up') {
        // Count-up game logic
        gameState.currentScore += roundTotal;
        gameState.round++;
        
        gameState.history.push({
            round: gameState.round - 1,
            dart1: dart1,
            dart2: dart2,
            dart3: dart3,
            total: roundTotal,
            remaining: gameState.currentScore
        });
        
        if (gameState.round > 8) {
            showWinner();
            return;
        }
    } else if (gameState.mode === 'cricket') {
        // Cricket game - simplified version
        // Note: This is a basic scoring implementation without standard cricket rules
        // Standard cricket tracks marks on numbers 15-20 and bullseye
        // This simplified version only tracks cumulative score for demonstration
        gameState.currentScore += roundTotal;
        gameState.round++;
        
        gameState.history.push({
            round: gameState.round - 1,
            dart1: dart1,
            dart2: dart2,
            dart3: dart3,
            total: roundTotal,
            remaining: gameState.currentScore
        });
    }
    
    updateDisplay();
    updateHistory();
    clearInputs();
}

// Show winner message
function showWinner() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    const winnerDiv = document.createElement('div');
    winnerDiv.className = 'winner-message';
    
    let message = '';
    if (gameState.mode === '01') {
        message = `
            <h2>🎉 おめでとうございます！</h2>
            <p>ラウンド ${gameState.round} でフィニッシュ！</p>
            <button class="btn btn-primary" onclick="location.reload()">新しいゲーム</button>
        `;
    } else if (gameState.mode === 'count-up') {
        message = `
            <h2>🎉 ゲーム終了！</h2>
            <p>最終スコア: ${gameState.currentScore}</p>
            <button class="btn btn-primary" onclick="location.reload()">新しいゲーム</button>
        `;
    } else {
        message = `
            <h2>🎉 ゲーム終了！</h2>
            <p>スコア: ${gameState.currentScore}</p>
            <button class="btn btn-primary" onclick="location.reload()">新しいゲーム</button>
        `;
    }
    
    winnerDiv.innerHTML = message;
    
    document.body.appendChild(overlay);
    document.body.appendChild(winnerDiv);
}

// Event listeners
gameModeSelect.addEventListener('change', function() {
    gameState.mode = this.value;
    
    if (this.value === '01') {
        targetScoreSection.style.display = 'block';
        gameState.currentScore = gameState.targetScore;
        currentScoreDisplay.parentElement.querySelector('.score-label').textContent = '残り得点:';
    } else if (this.value === 'count-up') {
        targetScoreSection.style.display = 'none';
        gameState.currentScore = 0;
        currentScoreDisplay.parentElement.querySelector('.score-label').textContent = '合計得点:';
    } else {
        targetScoreSection.style.display = 'none';
        gameState.currentScore = 0;
        currentScoreDisplay.parentElement.querySelector('.score-label').textContent = 'スコア:';
    }
    
    initGame();
});

targetScoreSelect.addEventListener('change', function() {
    gameState.targetScore = parseInt(this.value);
    if (gameState.mode === '01') {
        initGame();
    }
});

submitButton.addEventListener('click', submitRound);

resetButton.addEventListener('click', function() {
    if (confirm('ゲームをリセットしますか？')) {
        initGame();
    }
});

// Allow Enter key to submit
[dart1Input, dart2Input, dart3Input].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitRound();
        }
    });
});

// Initialize on load
initGame();
