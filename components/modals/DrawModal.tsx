'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface DrawModalProps {
    isOpen: boolean;
    onPlayAgain: () => void;
}

export function DrawModal({ isOpen, onPlayAgain }: DrawModalProps) {
    const { theme } = useTheme();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onPlayAgain();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onPlayAgain]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="draw-modal-title"
                >
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onPlayAgain}
                    />

                    <motion.div
                        className="relative w-full max-w-sm mx-4 p-6 rounded-3xl text-center overflow-hidden glass-card"
                        style={{
                            maxWidth: 'min(24rem, calc(100vw - 3rem))',
                            boxShadow: '0 30px 80px -12px rgba(0,0,0,0.25)',
                        }}
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="text-5xl sm:text-6xl mb-4 drop-shadow-lg"
                        >
                            🤝
                        </motion.div>

                        <motion.h2
                            id="draw-modal-title"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl font-bold mb-2"
                            style={{ color: theme.colors.text }}
                        >
                            Ничья!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm sm:text-base mb-6"
                            style={{ color: theme.colors.textMuted }}
                        >
                            Достойная партия! Сыграем ещё разок? 🎮
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={onPlayAgain}
                            className="w-full py-3.5 px-6 rounded-2xl font-bold text-white text-base transition-all duration-200 min-h-[48px] btn-shimmer"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                boxShadow: `0 8px 30px ${theme.colors.primary}40`,
                            }}
                            whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${theme.colors.primary}50` }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Сыграть ещё раз
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
