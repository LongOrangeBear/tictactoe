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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="draw-modal-title"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(8px)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onPlayAgain}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative text-center"
                        style={{
                            width: 'min(90vw, 380px)',
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            borderRadius: '28px',
                            padding: '32px 24px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.4) inset',
                            overflow: 'hidden',
                        }}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Emoji */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{ fontSize: '56px', marginBottom: '16px' }}
                        >
                            <motion.span
                                animate={{ y: [0, -10, 0] }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                🤝
                            </motion.span>
                        </motion.div>

                        {/* Title with gradient */}
                        <motion.h2
                            id="draw-modal-title"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: '28px',
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '12px',
                            }}
                        >
                            Ничья!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '14px',
                                marginBottom: '24px',
                                color: theme.colors.textMuted,
                            }}
                        >
                            Достойная партия! Сыграем ещё разок? 🎮
                        </motion.p>

                        {/* Primary button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={onPlayAgain}
                            className="btn-shimmer"
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: `0 8px 24px ${theme.colors.primary}40, 0 0 0 1px rgba(255, 255, 255, 0.2) inset`,
                            }}
                            whileHover={{
                                y: -2,
                                boxShadow: `0 12px 32px ${theme.colors.primary}50, 0 0 0 1px rgba(255, 255, 255, 0.3) inset`
                            }}
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
