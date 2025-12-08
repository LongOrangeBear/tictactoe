export type ThemeId = 'classic' | 'hearts' | 'flowers' | 'stars';

export interface Theme {
    id: ThemeId;
    name: string;
    nameRu: string;
    symbols: {
        player: string;
        computer: string;
    };
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        backgroundGradient: string;
        cardBg: string;
        text: string;
        textMuted: string;
        playerColor: string;
        computerColor: string;
        cellBg: string;
        cellBgHover: string;
        cellBorder: string;
        winHighlight: string;
    };
    emoji: string;
}

export const themes: Record<ThemeId, Theme> = {
    classic: {
        id: 'classic',
        name: 'Classic',
        nameRu: 'Классика',
        symbols: {
            player: '✕',
            computer: '○',
        },
        colors: {
            primary: '#6b7280',
            secondary: '#9ca3af',
            accent: '#374151',
            background: '#f8fafc',
            backgroundGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            cardBg: 'rgba(255, 255, 255, 0.9)',
            text: '#1f2937',
            textMuted: '#6b7280',
            playerColor: '#374151',
            computerColor: '#6b7280',
            cellBg: 'rgba(255, 255, 255, 0.8)',
            cellBgHover: 'rgba(241, 245, 249, 0.9)',
            cellBorder: '#e2e8f0',
            winHighlight: 'rgba(55, 65, 81, 0.1)',
        },
        emoji: '🎯',
    },
    hearts: {
        id: 'hearts',
        name: 'Hearts',
        nameRu: 'Сердечки',
        symbols: {
            player: '💖',
            computer: '💜',
        },
        colors: {
            primary: '#ec4899',
            secondary: '#a855f7',
            accent: '#db2777',
            background: '#fdf2f8',
            backgroundGradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f5d0fe 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: '#831843',
            textMuted: '#9d174d',
            playerColor: '#ec4899',
            computerColor: '#a855f7',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(252, 231, 243, 0.9)',
            cellBorder: '#fbcfe8',
            winHighlight: 'rgba(236, 72, 153, 0.15)',
        },
        emoji: '💖',
    },
    flowers: {
        id: 'flowers',
        name: 'Flowers',
        nameRu: 'Цветочки',
        symbols: {
            player: '🌸',
            computer: '🌿',
        },
        colors: {
            primary: '#14b8a6',
            secondary: '#fb923c',
            accent: '#f97316',
            background: '#f0fdfa',
            backgroundGradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #fed7aa 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: '#134e4a',
            textMuted: '#0f766e',
            playerColor: '#14b8a6',
            computerColor: '#f97316',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(204, 251, 241, 0.9)',
            cellBorder: '#99f6e4',
            winHighlight: 'rgba(20, 184, 166, 0.15)',
        },
        emoji: '🌸',
    },
    stars: {
        id: 'stars',
        name: 'Stars',
        nameRu: 'Звёздочки',
        symbols: {
            player: '⭐',
            computer: '✨',
        },
        colors: {
            primary: '#f59e0b',
            secondary: '#fbbf24',
            accent: '#d97706',
            background: '#fffbeb',
            backgroundGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: '#78350f',
            textMuted: '#92400e',
            playerColor: '#f59e0b',
            computerColor: '#d97706',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(254, 243, 199, 0.9)',
            cellBorder: '#fcd34d',
            winHighlight: 'rgba(245, 158, 11, 0.15)',
        },
        emoji: '⭐',
    },
};

export const themeList = Object.values(themes);
