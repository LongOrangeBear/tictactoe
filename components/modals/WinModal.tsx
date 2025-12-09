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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="win-modal-title"
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
                            boxShadow: `0 24px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.4) inset`,
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
                                🎉
                            </motion.span>
                        </motion.div>

                        {/* Title with gradient */}
                        <motion.h2
                            id="win-modal-title"
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
                            Поздравляем!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '14px',
                                marginBottom: '16px',
                                color: theme.colors.textMuted,
                            }}
                        >
                            Ваш промокод на скидку:
                        </motion.p>

                        {/* Promo box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                border: `2px dashed ${theme.colors.primary}`,
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: theme.colors.primary,
                                    letterSpacing: '2px',
                                }}
                            >
                                {promoCode}
                            </p>
                        </motion.div>

                        {/* Action buttons row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                marginBottom: '16px',
                            }}
                        >
                            <button
                                onClick={copyPromoCode}
                                className="btn-shimmer"
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    backgroundColor: copied ? '#22c55e' : 'rgba(255,255,255,0.8)',
                                    color: copied ? '#ffffff' : theme.colors.text,
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {copied ? '✓ Скопировано' : '📋 Скопировать'}
                            </button>

                            <a
                                href={telegramDeepLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-shimmer"
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #0088cc, #00aaff)',
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
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
                            style={{
                                fontSize: '12px',
                                marginBottom: '16px',
                                fontWeight: 500,
                                color: theme.colors.textMuted,
                            }}
                        >
                            Введите код при оформлении заказа
                        </motion.p>

                        {/* Primary button with shimmer */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
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
                                boxShadow: `0 8px 24px ${theme.colors.primary}50, 0 0 0 1px rgba(255, 255, 255, 0.2) inset`,
                            }}
                            whileHover={{
                                y: -2,
                                boxShadow: `0 12px 32px ${theme.colors.primary}60, 0 0 0 1px rgba(255, 255, 255, 0.3) inset`
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
