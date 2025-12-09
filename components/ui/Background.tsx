'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/providers/ThemeProvider';

const backgrounds: Record<string, string> = {
    love: '/assets/backgrounds/love_bg.svg',
    star: '/assets/backgrounds/star_bg.svg',
    nature: '/assets/backgrounds/nature_bg.svg',
    night: '/assets/backgrounds/night_bg.svg',
};

export function Background() {
    const { themeId } = useTheme();
    const bgSrc = backgrounds[themeId] || backgrounds.love;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
            <Image
                src={bgSrc}
                alt="Background"
                fill
                priority
                className="object-cover"
            />
        </div>
    );
}
