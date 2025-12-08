'use client';

import { motion } from 'framer-motion';
import { Cell } from './Cell';
import { Board as BoardType, WinningLine } from '@/lib/game-logic';
import { useTheme } from '@/components/providers/ThemeProvider';

interface BoardProps {
    board: BoardType;
    winningLine: WinningLine | null;
    disabled: boolean;
    onCellClick: (index: number) => void;
}

export function Board({ board, winningLine, disabled, onCellClick }: BoardProps) {
    const { theme } = useTheme();

    const isWinningCell = (index: number): boolean => {
        return winningLine?.indices.includes(index) ?? false;
    };

    return (
        <motion.div
            className="w-full mx-auto p-3 rounded-2xl glass-card"
            style={{ maxWidth: 'min(280px, calc(100vw - 2rem))' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            role="grid"
            aria-label="Игровое поле"
        >
            <div className="grid grid-cols-3 gap-2" role="row">
                {board.map((cell, index) => (
                    <Cell
                        key={index}
                        value={cell}
                        index={index}
                        onClick={() => onCellClick(index)}
                        isWinningCell={isWinningCell(index)}
                        disabled={disabled}
                    />
                ))}
            </div>
        </motion.div>
    );
}
