'use client';

import { useState, useCallback, useEffect } from 'react';
import {
    Board,
    GameResult,
    createEmptyBoard,
    checkWinner,
    getGameResult,
    getEasyAIMove,
    generatePromoCode,
    WinningLine
} from '@/lib/game-logic';
import { sendTelegramNotification } from '@/lib/telegram';
import { useSound } from '@/components/providers/SoundProvider';

export interface GameState {
    board: Board;
    isPlayerTurn: boolean;
    result: GameResult;
    winningLine: WinningLine | null;
    promoCode: string | null;
    isProcessing: boolean;
}

export interface GameStats {
    wins: number;
    losses: number;
    draws: number;
    currentStreak: number;
    bestStreak: number;
}

const STATS_STORAGE_KEY = 'tictactoe-stats';

const defaultStats: GameStats = {
    wins: 0,
    losses: 0,
    draws: 0,
    currentStreak: 0,
    bestStreak: 0,
};

export function useGame(playerName?: string | null) {
    const { playClick, playWin, playLose } = useSound();

    const [gameState, setGameState] = useState<GameState>({
        board: createEmptyBoard(),
        isPlayerTurn: true,
        result: null,
        winningLine: null,
        promoCode: null,
        isProcessing: false,
    });

    const [stats, setStats] = useState<GameStats>(defaultStats);

    // Load stats from localStorage
    useEffect(() => {
        const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
        if (savedStats) {
            try {
                const parsed = JSON.parse(savedStats);
                setStats({ ...defaultStats, ...parsed });
            } catch {
                // Invalid JSON, use defaults
            }
        }
    }, []);

    // Save stats to localStorage
    const updateStats = useCallback((newStats: GameStats) => {
        setStats(newStats);
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
    }, []);

    // Handle game end
    const handleGameEnd = useCallback(async (result: GameResult, promoCode?: string) => {
        if (result === 'win') {
            playWin();
            const newWins = stats.wins + 1;
            const newStreak = stats.currentStreak + 1;
            const newBestStreak = Math.max(stats.bestStreak, newStreak);
            updateStats({
                ...stats,
                wins: newWins,
                currentStreak: newStreak,
                bestStreak: newBestStreak,
            });
            if (promoCode) {
                await sendTelegramNotification({
                    type: 'win',
                    promoCode,
                    playerName: playerName || undefined,
                    totalWins: newWins,
                });
            }
        } else if (result === 'lose') {
            playLose();
            updateStats({
                ...stats,
                losses: stats.losses + 1,
                currentStreak: 0, // Reset streak on loss
            });
            await sendTelegramNotification({
                type: 'lose',
                playerName: playerName || undefined,
            });
        } else if (result === 'draw') {
            updateStats({
                ...stats,
                draws: stats.draws + 1,
                // Keep current streak on draw
            });
        }
    }, [stats, updateStats, playWin, playLose, playerName]);

    // AI makes a move
    const makeAIMove = useCallback((currentBoard: Board) => {
        const aiMove = getEasyAIMove(currentBoard);

        if (aiMove !== null) {
            const newBoard = [...currentBoard];
            newBoard[aiMove] = 'O';

            const winningLine = checkWinner(newBoard);
            const result = getGameResult(newBoard);

            setGameState(prev => ({
                ...prev,
                board: newBoard,
                isPlayerTurn: true,
                result,
                winningLine,
                isProcessing: false,
            }));

            if (result) {
                handleGameEnd(result);
            }
        } else {
            setGameState(prev => ({ ...prev, isPlayerTurn: true, isProcessing: false }));
        }
    }, [handleGameEnd]);

    // Player makes a move
    const makeMove = useCallback((index: number) => {
        const { board, isPlayerTurn, result, isProcessing } = gameState;

        // Validate move
        if (!isPlayerTurn || board[index] !== null || result !== null || isProcessing) {
            return;
        }

        playClick();

        // Make player's move
        const newBoard = [...board];
        newBoard[index] = 'X';

        const winningLine = checkWinner(newBoard);
        const gameResult = getGameResult(newBoard);

        if (gameResult === 'win') {
            const promoCode = generatePromoCode();
            setGameState({
                board: newBoard,
                isPlayerTurn: false,
                result: gameResult,
                winningLine,
                promoCode,
                isProcessing: false,
            });
            handleGameEnd(gameResult, promoCode);
            return;
        }

        if (gameResult === 'draw') {
            setGameState({
                board: newBoard,
                isPlayerTurn: false,
                result: gameResult,
                winningLine: null,
                promoCode: null,
                isProcessing: false,
            });
            handleGameEnd(gameResult);
            return;
        }

        // AI's turn
        setGameState({
            board: newBoard,
            isPlayerTurn: false,
            result: null,
            winningLine: null,
            promoCode: null,
            isProcessing: true,
        });

        // Delay AI move for better UX
        setTimeout(() => makeAIMove(newBoard), 500);
    }, [gameState, playClick, makeAIMove, handleGameEnd]);

    // Reset the game
    const resetGame = useCallback(() => {
        setGameState({
            board: createEmptyBoard(),
            isPlayerTurn: true,
            result: null,
            winningLine: null,
            promoCode: null,
            isProcessing: false,
        });
    }, []);

    // Reset stats
    const resetStats = useCallback(() => {
        const newStats = defaultStats;
        setStats(newStats);
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
    }, []);

    return {
        ...gameState,
        stats,
        makeMove,
        resetGame,
        resetStats,
    };
}
