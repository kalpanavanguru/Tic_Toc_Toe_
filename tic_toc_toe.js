class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.cells = document.querySelectorAll('.game-cell');
        this.statusElement = document.getElementById('status');
        this.resetButton = document.getElementById('resetBtn');

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });

        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    handleCellClick(cell) {
        const cellIndex = cell.getAttribute('data-cell');

        if (this.board[cellIndex] === '' && this.gameActive) {
            this.board[cellIndex] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add(this.currentPlayer.toLowerCase());

            if (this.checkWin()) {
                this.endGame(false);
            } else if (this.checkDraw()) {
                this.endGame(true);
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.updateStatus();
            }
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (
                this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                // Highlight winning cells
                this.cells[a].classList.add('winner');
                this.cells[b].classList.add('winner');
                this.cells[c].classList.add('winner');
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    endGame(isDraw) {
        this.gameActive = false;
        if (isDraw) {
            this.statusElement.textContent = "Game ended in a draw!";
            this.statusElement.classList.remove('alert-info');
            this.statusElement.classList.add('alert-warning');
        } else {
            this.statusElement.textContent = `Player ${this.currentPlayer} wins!`;
            this.statusElement.classList.remove('alert-info');
            this.statusElement.classList.add('alert-success');
        }
    }

    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });

        this.statusElement.textContent = "Player X's turn";
        this.statusElement.classList.remove('alert-success', 'alert-warning');
        this.statusElement.classList.add('alert-info');
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 