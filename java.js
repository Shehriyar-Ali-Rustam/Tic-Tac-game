document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const restartButton = document.getElementById('restartButton');
    const endButton = document.getElementById('endButton');
    const startButton = document.getElementById('startButton');
    const playerXNameInput = document.getElementById('playerXName');
    const playerONameInput = document.getElementById('playerOName');
    const playerNameInputDiv = document.getElementById('playerNameInput');
    const gameDiv = document.getElementById('game');
    const playerXDisplay = document.getElementById('playerXDisplay');
    const playerODisplay = document.getElementById('playerODisplay');
    const scoreXDisplay = document.getElementById('scoreX');
    const scoreODisplay = document.getElementById('scoreO');
    let playerXName = 'Player X';
    let playerOName = 'Player O';
    let scoreX = 0;
    let scoreO = 0;
    let oTurn;

    startButton.addEventListener('click', startGameSetup);
    restartButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame);

    function startGameSetup() {
        playerXName = playerXNameInput.value || 'Player X';
        playerOName = playerONameInput.value || 'Player O';
        playerXDisplay.textContent = playerXName;
        playerODisplay.textContent = playerOName;
        playerNameInputDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        startGame();
    }

    function startGame() {
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
    }

    function endGame() {
        playerNameInputDiv.style.display = 'block';
        gameDiv.style.display = 'none';
        scoreX = 0;
        scoreO = 0;
        scoreXDisplay.textContent = scoreX;
        scoreODisplay.textContent = scoreO;
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endRound(false);
        } else if (isDraw()) {
            endRound(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        oTurn = !oTurn;
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        if (oTurn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function endRound(draw) {
        if (draw) {
            alert("Draw!");
        } else {
            if (oTurn) {
                scoreO++;
                scoreODisplay.textContent = scoreO;
                alert(`${playerOName} Wins!`);
            } else {
                scoreX++;
                scoreXDisplay.textContent = scoreX;
                alert(`${playerXName} Wins!`);
            }
        }
        startGame();
    }
});
