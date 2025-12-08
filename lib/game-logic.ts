export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameResult = 'win' | 'lose' | 'draw' | null;

export interface WinningLine {
    indices: number[];
    player: Player;
}

// Winning combinations for tic-tac-toe
const WINNING_LINES = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
];

/**
 * Check if there is a winner on the board
 */
export function checkWinner(board: Board): WinningLine | null {
    for (const line of WINNING_LINES) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                indices: line,
                player: board[a] as Player,
            };
        }
    }
    return null;
}

/**
 * Check if the board is full (draw condition)
 */
export function isBoardFull(board: Board): boolean {
    return board.every((cell) => cell !== null);
}

/**
 * Get all empty cell indices
 */
export function getEmptyCells(board: Board): number[] {
    return board
        .map((cell, index) => (cell === null ? index : -1))
        .filter((index) => index !== -1);
}

/**
 * Easy AI: picks a random empty cell
 */
export function getEasyAIMove(board: Board): number | null {
    const emptyCells = getEmptyCells(board);
    if (emptyCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

/**
 * Create an empty board
 */
export function createEmptyBoard(): Board {
    return Array(9).fill(null);
}

/**
 * Generate a 5-digit promo code
 */
export function generatePromoCode(): string {
    return String(Math.floor(10000 + Math.random() * 90000));
}

/**
 * Get game result from player's perspective
 * Player is always 'X', Computer is always 'O'
 */
export function getGameResult(board: Board): GameResult {
    const winner = checkWinner(board);

    if (winner) {
        return winner.player === 'X' ? 'win' : 'lose';
    }

    if (isBoardFull(board)) {
        return 'draw';
    }

    return null;
}
