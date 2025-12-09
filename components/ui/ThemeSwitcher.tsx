'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { themeList, ThemeId } from '@/lib/themes';

export function ThemeSwitcher() {
    const { themeId, setTheme } = useTheme();

    return (
        <div
            className="w-[260px] md:w-[280px] h-[56px] md:h-[64px] mx-auto my-2 flex items-center justify-center gap-3 md:gap-4 rounded-[20px] md:rounded-[24px]"
            style={{
                background: 'rgb(255 255 255 / 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            }}
        >
            {/* Theme Buttons */}
            {themeList.map((t) => {
                const isActive = themeId === t.id;
                return (
                    <motion.button
                        key={t.id}
                        onClick={() => setTheme(t.id as ThemeId)}
                        className="relative flex flex-col items-center"
                        whileTap={{ scale: 0.95 }}
                        aria-pressed={isActive}
                        aria-label={t.nameRu}
                    >
                        {/* Button Circle */}
                        <div
                            className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                                border: isActive
                                    ? `3px solid ${t.colors.primary}`
                                    : '1px solid rgba(255, 255, 255, 0.4)',
                                boxShadow: isActive
                                    ? `0 0 0 4px ${t.colors.glow}, 0 4px 16px rgba(0,0,0,0.2)`
                                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <span className="text-2xl md:text-[28px] select-none">{t.emoji}</span>
                        </div>

                        {/* Glow Reflection */}
                        <div
                            className="w-[32px] h-[8px] md:w-[36px] md:h-[10px] rounded-full mt-1 transition-opacity duration-300"
                            style={{
                                background: t.colors.glow,
                                opacity: isActive ? 1 : 0.6,
                                filter: 'blur(4px)',
                            }}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
}
