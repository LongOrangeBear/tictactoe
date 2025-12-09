'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import styles from './Cell.module.css';

interface CellProps {
    value: 'X' | 'O' | null;
    index: number;
    onClick: () => void;
    isWinningCell: boolean;
    disabled: boolean;
}

export function Cell({ value, index, onClick, isWinningCell, disabled }: CellProps) {
    const { theme } = useTheme();

    const getSymbolIcon = () => {
        if (!value) return null;
        return value === 'X' ? theme.symbolIcons.player : theme.symbolIcons.computer;
    };

    const cellClasses = [
        styles.cell,
        value ? styles.filled : '',
        isWinningCell ? styles.winning : '',
    ].filter(Boolean).join(' ');

    const symbolIcon = getSymbolIcon();

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled || value !== null}
            className={cellClasses}
            style={{
                ...(isWinningCell && {
                    background: `linear-gradient(135deg, ${theme.colors.winHighlight}, ${theme.colors.glow})`,
                    borderColor: theme.colors.primary,
                }),
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
            }}
            whileHover={!disabled && !value ? {
                scale: 1.03,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
            } : {}}
            whileTap={!disabled && !value ? { scale: 0.97 } : {}}
            initial={{ opacity: 0, scale: 0.8, backgroundColor: 'rgba(255, 255, 255, 0)' }}
            animate={{ opacity: 1, scale: 1, backgroundColor: 'rgba(255, 255, 255, 0)' }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            role="gridcell"
            aria-disabled={disabled || value !== null}
        >
            {value && symbolIcon && (
                <motion.div
                    className="relative w-[60%] h-[60%]"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Image
                        src={symbolIcon}
                        alt={value === 'X' ? 'Player' : 'Computer'}
                        fill
                        className="object-contain"
                    />
                </motion.div>
            )}
        </motion.button>
    );
}
