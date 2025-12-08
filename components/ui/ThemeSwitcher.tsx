'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { themeList, ThemeId } from '@/lib/themes';

export function ThemeSwitcher() {
    const { themeId, setTheme, theme } = useTheme();

    return (
        <div className="w-full max-w-sm mb-3">
            <p
                className="text-[10px] text-center mb-1.5"
                style={{ color: theme.colors.textMuted }}
            >
                Тема:
            </p>
            <div className="flex justify-center gap-1.5 flex-wrap">
                {themeList.map((t) => {
                    const isActive = themeId === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id as ThemeId)}
                            className="px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 min-h-[36px] transition-all duration-200"
                            style={{
                                background: isActive
                                    ? `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})`
                                    : 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                color: isActive ? '#ffffff' : theme.colors.text,
                                boxShadow: isActive
                                    ? `0 4px 15px ${t.colors.primary}40`
                                    : '0 2px 8px rgba(0,0,0,0.06)',
                                transform: 'scale(1)',
                            }}
                            aria-pressed={isActive}
                        >
                            <span className="text-sm">{t.emoji}</span>
                            <span className="hidden sm:inline truncate max-w-[60px]">{t.nameRu}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
