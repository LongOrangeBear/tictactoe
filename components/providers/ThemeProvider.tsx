'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeId, themes } from '@/lib/themes';

interface ThemeContextType {
    theme: Theme;
    themeId: ThemeId;
    setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'tictactoe-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeId, setThemeId] = useState<ThemeId>('love');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
        if (savedTheme && themes[savedTheme]) {
            setThemeId(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, themeId);

            // Apply CSS variables and data-theme to document
            const theme = themes[themeId];
            const root = document.documentElement;

            // Set data-theme attribute for CSS selectors
            root.setAttribute('data-theme', themeId);

            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });

            // Apply background gradient to body
            // document.body.style.background = theme.colors.backgroundGradient;
        }
    }, [themeId, mounted]);

    const setTheme = (id: ThemeId) => {
        setThemeId(id);
    };

    const value = {
        theme: themes[themeId],
        themeId,
        setTheme,
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ ...value, theme: themes['love'] }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
