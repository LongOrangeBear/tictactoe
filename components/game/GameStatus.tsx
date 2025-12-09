'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface GameStatusProps {
    isPlayerTurn: boolean;
    isProcessing: boolean;
}

export function GameStatus({ isPlayerTurn, isProcessing }: GameStatusProps) {
    const { theme } = useTheme();

    const getMessage = () => {
        if (isProcessing) return 'Думаю...';
        return isPlayerTurn ? 'Ваш ход' : 'Ход ИИ';
    };

    const wrapperStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
    };

    const statusStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: '44px',
        padding: '0 24px',
        fontSize: '18px',
        fontWeight: 600,
        color: theme.colors.text,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    };

    const symbolStyle: React.CSSProperties = {
        fontSize: '1.25rem',
    };

    return (
        <motion.div
            style={wrapperStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            aria-live="polite"
        >
            <motion.div
                key={getMessage()}
                style={statusStyle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {isProcessing && (
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                        ⏳
                    </motion.span>
                )}
                <span>{getMessage()}</span>
                {!isProcessing && (
                    <span style={symbolStyle}>
                        {isPlayerTurn ? theme.symbols.player : theme.symbols.computer}
                    </span>
                )}
            </motion.div>
        </motion.div>
    );
}
