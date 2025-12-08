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

    return (
        <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            aria-live="polite"
        >
            <motion.p
                key={getMessage()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium flex items-center justify-center gap-1.5"
                style={{ color: theme.colors.text }}
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
                    <span className="text-base">
                        {isPlayerTurn ? theme.symbols.player : theme.symbols.computer}
                    </span>
                )}
            </motion.p>
        </motion.div>
    );
}
