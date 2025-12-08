'use client';

import { motion } from 'framer-motion';
import { useSound } from '@/components/providers/SoundProvider';
import { useTheme } from '@/components/providers/ThemeProvider';

export function SoundToggle() {
    const { isMuted, toggleMute } = useSound();
    const { theme } = useTheme();

    return (
        <motion.button
            onClick={toggleMute}
            className="fixed top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            style={{
                backgroundColor: theme.colors.cardBg,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: `2px solid ${theme.colors.cellBorder}`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
            <motion.span
                key={isMuted ? 'muted' : 'unmuted'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xl sm:text-2xl"
            >
                {isMuted ? '🔇' : '🔊'}
            </motion.span>
        </motion.button>
    );
}
