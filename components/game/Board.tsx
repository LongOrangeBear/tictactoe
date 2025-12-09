'use client';

import { motion } from 'framer-motion';
import { Cell } from './Cell';
import { Board as BoardType, WinningLine } from '@/lib/game-logic';
import styles from './Board.module.css';

interface BoardProps {
    board: BoardType;
    winningLine: WinningLine | null;
    disabled: boolean;
    onCellClick: (index: number) => void;
}

export function Board({ board, winningLine, disabled, onCellClick }: BoardProps) {
    const isWinningCell = (index: number): boolean => {
        return winningLine?.indices.includes(index) ?? false;
    };

    return (
        <motion.div
            className={styles.boardContainer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            role="grid"
            aria-label="Игровое поле"
        >
            <div className={styles.board} role="row">
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

