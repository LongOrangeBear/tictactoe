'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTheme } from '@/components/providers/ThemeProvider';
import { generateTelegramDeepLink } from '@/lib/telegram';

interface WinModalProps {
    isOpen: boolean;
    promoCode: string;
    onPlayAgain: () => void;
}

export function WinModal({ isOpen, promoCode, onPlayAgain }: WinModalProps) {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCopied(false);
            // Fire confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = [theme.colors.primary, theme.colors.secondary, theme.colors.accent];

            (function frame() {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0, y: 0.7 },
                    colors,
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1, y: 0.7 },
                    colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
    }, [isOpen, theme]);

    const copyPromoCode = async () => {
        try {
            await navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = promoCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onPlayAgain();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onPlayAgain]);

    const telegramDeepLink = generateTelegramDeepLink(promoCode);

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
                    aria-labelledby="win-modal-title"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onPlayAgain}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-sm mx-4 p-6 rounded-3xl text-center overflow-hidden glass-card"
                        style={{
                            maxWidth: 'min(24rem, calc(100vw - 3rem))',
                            boxShadow: `0 30px 80px -12px ${theme.colors.primary}50, 0 0 60px ${theme.colors.primary}20`,
                        }}
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Decorative elements */}
                        <div
                            className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-60"
                            style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                            className="absolute -bottom-12 -left-12 w-28 h-28 rounded-full blur-3xl opacity-40"
                            style={{ backgroundColor: theme.colors.secondary }}
                        />

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="text-5xl sm:text-6xl mb-4 drop-shadow-lg"
                        >
                            🎉
                        </motion.div>

                        <motion.h2
                            id="win-modal-title"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl font-bold mb-2"
                            style={{ color: theme.colors.text }}
                        >
                            Поздравляем!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm mb-4"
                            style={{ color: theme.colors.textMuted }}
                        >
                            Ваш промокод на скидку:
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative px-5 py-3 rounded-2xl mb-4"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`,
                                border: `2px dashed ${theme.colors.primary}`,
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <p
                                className="text-2xl sm:text-3xl font-mono font-bold tracking-widest drop-shadow-sm"
                                style={{ color: theme.colors.primary }}
                            >
                                {promoCode}
                            </p>
                            <motion.div
                                className="absolute -top-2 -right-2 text-xl"
                                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                ✨
                            </motion.div>
                        </motion.div>

                        {/* Action buttons row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="flex gap-2 mb-4"
                        >
                            <button
                                onClick={copyPromoCode}
                                className="flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] btn-shimmer"
                                style={{
                                    backgroundColor: copied ? '#22c55e' : 'rgba(255,255,255,0.8)',
                                    color: copied ? '#ffffff' : theme.colors.text,
                                    border: '1px solid rgba(255,255,255,0.5)',
                                }}
                            >
                                {copied ? '✓ Скопировано' : '📋 Скопировать'}
                            </button>

                            <a
                                href={telegramDeepLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center justify-center gap-1 btn-shimmer"
                                style={{
                                    background: 'linear-gradient(135deg, #0088cc, #00a8e8)',
                                    color: '#ffffff',
                                }}
                            >
                                <span>📩</span>
                                <span>В Telegram</span>
                            </a>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xs mb-4 font-medium"
                            style={{ color: theme.colors.textMuted }}
                        >
                            Введите код при оформлении заказа
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                            onClick={onPlayAgain}
                            className="w-full py-3.5 px-6 rounded-2xl font-bold text-white text-base transition-all duration-200 min-h-[48px] btn-shimmer"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                boxShadow: `0 8px 30px ${theme.colors.primary}50`,
                            }}
                            whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${theme.colors.primary}60` }}
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
