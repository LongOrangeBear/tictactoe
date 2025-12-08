'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface WelcomeModalProps {
    isOpen: boolean;
    onSubmit: (name: string) => void;
}

export function WelcomeModal({ isOpen, onSubmit }: WelcomeModalProps) {
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Введите ваше имя');
            return;
        }

        if (trimmedName.length < 2) {
            setError('Имя слишком короткое');
            return;
        }

        if (trimmedName.length > 20) {
            setError('Имя слишком длинное');
            return;
        }

        onSubmit(trimmedName);
    };

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
                    aria-labelledby="welcome-modal-title"
                >
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className="relative w-full max-w-sm mx-4 p-6 sm:p-8 rounded-3xl text-center overflow-hidden glass-card"
                        style={{
                            maxWidth: 'min(24rem, calc(100vw - 3rem))',
                            boxShadow: `0 30px 80px -12px ${theme.colors.primary}40`,
                        }}
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div
                            className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-50"
                            style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                            className="absolute -bottom-12 -left-12 w-28 h-28 rounded-full blur-3xl opacity-30"
                            style={{ backgroundColor: theme.colors.secondary }}
                        />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="text-5xl sm:text-6xl mb-4 drop-shadow-lg"
                        >
                            👋
                        </motion.div>

                        <motion.h2
                            id="welcome-modal-title"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl font-bold mb-2"
                            style={{ color: theme.colors.text }}
                        >
                            Добро пожаловать!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm sm:text-base mb-6"
                            style={{ color: theme.colors.textMuted }}
                        >
                            Как вас зовут?
                        </motion.p>

                        <form onSubmit={handleSubmit}>
                            <motion.input
                                ref={inputRef}
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError('');
                                }}
                                placeholder="Ваше имя"
                                className="w-full px-4 py-3 rounded-xl text-center text-lg font-medium mb-2 outline-none transition-all duration-200"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    color: theme.colors.text,
                                    border: `2px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.5)'}`,
                                    backdropFilter: 'blur(10px)',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                maxLength={20}
                                autoComplete="off"
                            />

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm mb-4 font-medium"
                                    style={{ color: '#ef4444' }}
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="w-full py-3.5 px-6 rounded-2xl font-bold text-white text-base transition-all duration-200 min-h-[48px] mt-4 btn-shimmer"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                    boxShadow: `0 8px 30px ${theme.colors.primary}50`,
                                }}
                                whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${theme.colors.primary}60` }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Начать игру
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
