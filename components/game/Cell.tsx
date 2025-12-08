'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface CellProps {
    value: 'X' | 'O' | null;
    index: number;
    onClick: () => void;
    isWinningCell: boolean;
    disabled: boolean;
}

export function Cell({ value, index, onClick, isWinningCell, disabled }: CellProps) {
    const { theme } = useTheme();

    const getSymbol = () => {
        if (!value) return null;
        return value === 'X' ? theme.symbols.player : theme.symbols.computer;
    };

    const getColor = () => {
        if (!value) return 'inherit';
        return value === 'X' ? theme.colors.playerColor : theme.colors.computerColor;
    };

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || value !== null}
            className="aspect-square flex items-center justify-center text-2xl sm:text-3xl font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            style={{
                background: isWinningCell
                    ? `linear-gradient(135deg, ${theme.colors.winHighlight}, ${theme.colors.primary}15)`
                    : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${isWinningCell ? theme.colors.primary : 'rgba(255, 255, 255, 0.4)'}`,
                color: getColor(),
                boxShadow: isWinningCell
                    ? `0 0 20px ${theme.colors.primary}40`
                    : '0 2px 10px rgba(0, 0, 0, 0.06)',
            }}
            whileHover={!disabled && !value ? { scale: 1.05 } : {}}
            whileTap={!disabled && !value ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            role="gridcell"
            aria-disabled={disabled || value !== null}
        >
            {value && (
                <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="select-none"
                >
                    {getSymbol()}
                </motion.span>
            )}
        </motion.button>
    );
}
