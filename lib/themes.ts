export type ThemeId = 'love' | 'star' | 'nature' | 'night';

export interface Theme {
    id: ThemeId;
    name: string;
    nameRu: string;
    symbols: {
        player: string;
        computer: string;
    };
    symbolIcons: {
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
        glow: string;
        bgStart: string;
        bgMid: string;
        bgEnd: string;
    };
    emoji: string;
}

export const themes: Record<ThemeId, Theme> = {
    love: {
        id: 'love',
        name: 'Love',
        nameRu: 'Любовь',
        symbols: {
            player: '❤️',
            computer: '💜',
        },
        symbolIcons: {
            player: '/assets/icons/symbol_x_heart.svg',
            computer: '/assets/icons/symbol_o_star.svg',
        },
        colors: {
            primary: 'hsl(340, 80%, 60%)',
            secondary: 'hsl(320, 70%, 70%)',
            accent: 'hsl(340, 85%, 55%)',
            background: 'hsl(340, 80%, 95%)',
            backgroundGradient: 'linear-gradient(135deg, hsl(340, 80%, 95%) 0%, hsl(320, 60%, 92%) 50%, hsl(300, 70%, 94%) 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: 'hsl(340, 50%, 30%)',
            textMuted: 'hsl(340, 30%, 40%)',
            playerColor: 'hsl(340, 80%, 60%)',
            computerColor: 'hsl(320, 70%, 70%)',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(255, 255, 255, 0.9)',
            cellBorder: 'rgba(255, 255, 255, 0.5)',
            winHighlight: 'rgba(255, 100, 130, 0.15)',
            glow: 'rgba(255, 100, 130, 0.4)',
            bgStart: 'hsl(340, 80%, 95%)',
            bgMid: 'hsl(320, 60%, 92%)',
            bgEnd: 'hsl(300, 70%, 94%)',
        },
        emoji: '❤️',
    },
    star: {
        id: 'star',
        name: 'Star',
        nameRu: 'Звёзды',
        symbols: {
            player: '⭐',
            computer: '✨',
        },
        symbolIcons: {
            player: '/assets/icons/symbol_x_star.svg',
            computer: '/assets/icons/symbol_o_sparkle.svg',
        },
        colors: {
            primary: 'hsl(45, 90%, 55%)',
            secondary: 'hsl(35, 85%, 60%)',
            accent: 'hsl(45, 95%, 50%)',
            background: 'hsl(45, 80%, 95%)',
            backgroundGradient: 'linear-gradient(135deg, hsl(45, 80%, 95%) 0%, hsl(35, 70%, 92%) 50%, hsl(25, 60%, 94%) 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: 'hsl(45, 50%, 25%)',
            textMuted: 'hsl(45, 30%, 40%)',
            playerColor: 'hsl(45, 90%, 55%)',
            computerColor: 'hsl(35, 85%, 60%)',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(255, 255, 255, 0.9)',
            cellBorder: 'rgba(255, 255, 255, 0.5)',
            winHighlight: 'rgba(255, 200, 50, 0.15)',
            glow: 'rgba(255, 200, 50, 0.4)',
            bgStart: 'hsl(45, 80%, 95%)',
            bgMid: 'hsl(35, 70%, 92%)',
            bgEnd: 'hsl(25, 60%, 94%)',
        },
        emoji: '⭐',
    },
    nature: {
        id: 'nature',
        name: 'Nature',
        nameRu: 'Природа',
        symbols: {
            player: '🍀',
            computer: '🌿',
        },
        symbolIcons: {
            player: '/assets/icons/symbol_x_clover.svg',
            computer: '/assets/icons/symbol_o_leaf.svg',
        },
        colors: {
            primary: 'hsl(140, 60%, 45%)',
            secondary: 'hsl(160, 50%, 55%)',
            accent: 'hsl(140, 65%, 40%)',
            background: 'hsl(140, 60%, 95%)',
            backgroundGradient: 'linear-gradient(135deg, hsl(140, 60%, 95%) 0%, hsl(160, 50%, 92%) 50%, hsl(120, 40%, 94%) 100%)',
            cardBg: 'rgba(255, 255, 255, 0.85)',
            text: 'hsl(140, 50%, 25%)',
            textMuted: 'hsl(140, 30%, 40%)',
            playerColor: 'hsl(140, 60%, 45%)',
            computerColor: 'hsl(160, 50%, 55%)',
            cellBg: 'rgba(255, 255, 255, 0.7)',
            cellBgHover: 'rgba(255, 255, 255, 0.9)',
            cellBorder: 'rgba(255, 255, 255, 0.5)',
            winHighlight: 'rgba(100, 200, 100, 0.15)',
            glow: 'rgba(100, 200, 100, 0.4)',
            bgStart: 'hsl(140, 60%, 95%)',
            bgMid: 'hsl(160, 50%, 92%)',
            bgEnd: 'hsl(120, 40%, 94%)',
        },
        emoji: '🍀',
    },
    night: {
        id: 'night',
        name: 'Night',
        nameRu: 'Ночь',
        symbols: {
            player: '🌙',
            computer: '💫',
        },
        symbolIcons: {
            player: '/assets/icons/symbol_x_moon.svg',
            computer: '/assets/icons/symbol_o_star.svg',
        },
        colors: {
            primary: 'hsl(260, 60%, 55%)',
            secondary: 'hsl(240, 50%, 45%)',
            accent: 'hsl(260, 65%, 50%)',
            background: 'hsl(260, 40%, 20%)',
            backgroundGradient: 'linear-gradient(135deg, hsl(260, 40%, 20%) 0%, hsl(240, 35%, 15%) 50%, hsl(280, 30%, 18%) 100%)',
            cardBg: 'rgba(255, 255, 255, 0.15)',
            text: 'hsl(260, 20%, 90%)',
            textMuted: 'hsl(260, 15%, 70%)',
            playerColor: 'hsl(260, 60%, 70%)',
            computerColor: 'hsl(240, 50%, 65%)',
            cellBg: 'rgba(255, 255, 255, 0.1)',
            cellBgHover: 'rgba(255, 255, 255, 0.2)',
            cellBorder: 'rgba(255, 255, 255, 0.2)',
            winHighlight: 'rgba(100, 100, 200, 0.25)',
            glow: 'rgba(100, 100, 200, 0.4)',
            bgStart: 'hsl(260, 40%, 20%)',
            bgMid: 'hsl(240, 35%, 15%)',
            bgEnd: 'hsl(280, 30%, 18%)',
        },
        emoji: '🌙',
    },
};

export const themeList = Object.values(themes);
