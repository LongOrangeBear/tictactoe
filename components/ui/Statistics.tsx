'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { GameStats } from '@/hooks/useGame';

interface StatisticsProps {
    stats: GameStats;
    onReset?: () => void;
}

export function Statistics({ stats, onReset }: StatisticsProps) {
    const { theme } = useTheme();
    const [showConfirm, setShowConfirm] = useState(false);

    const statItems = [
        { label: 'Победы', value: stats.wins, emoji: '🏆', color: '#22c55e' },
        { label: 'Поражения', value: stats.losses, emoji: '😢', color: '#ef4444' },
        { label: 'Ничьи', value: stats.draws, emoji: '🤝', color: '#f59e0b' },
    ];

    const handleReset = () => {
        if (showConfirm) {
            onReset?.();
            setShowConfirm(false);
        } else {
            setShowConfirm(true);
            setTimeout(() => setShowConfirm(false), 3000);
        }
    };

    const currentStreak = stats.currentStreak || 0;
    const bestStreak = stats.bestStreak || 0;

    return (
        <motion.div
            className="w-full mx-auto mt-3 p-3 rounded-xl glass-card"
            style={{ maxWidth: 'min(280px, calc(100vw - 2rem))' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <div className="flex justify-around items-center">
                {statItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <div className="text-sm mb-0.5">{item.emoji}</div>
                        <div className="text-lg font-bold" style={{ color: item.color }}>
                            {item.value}
                        </div>
                        <div className="text-[10px]" style={{ color: theme.colors.textMuted }}>
                            {item.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {(currentStreak > 0 || bestStreak > 0) && (
                <div
                    className="mt-2 pt-2 border-t flex justify-center gap-3 text-[10px]"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                    {currentStreak > 0 && <span style={{ color: theme.colors.text }}>🔥 {currentStreak}</span>}
                    {bestStreak > 0 && <span style={{ color: theme.colors.textMuted }}>⭐ {bestStreak}</span>}
                </div>
            )}

            {onReset && (stats.wins > 0 || stats.losses > 0 || stats.draws > 0) && (
                <button
                    onClick={handleReset}
                    className="mt-2 w-full text-[10px] py-1.5 rounded-lg transition-all"
                    style={{
                        color: showConfirm ? '#ef4444' : theme.colors.textMuted,
                        backgroundColor: showConfirm ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                    }}
                >
                    {showConfirm ? 'Подтвердить сброс?' : 'Сбросить'}
                </button>
            )}
        </motion.div>
    );
}
