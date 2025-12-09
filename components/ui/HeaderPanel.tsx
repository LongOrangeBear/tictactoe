'use client';

import React from 'react';
import Image from 'next/image';

interface HeaderPanelProps {
    playerName?: string;
    wins?: number;
    losses?: number;
    draws?: number;
    onNameClick?: () => void;
}

export function HeaderPanel({
    playerName = 'Тест',
    wins = 2,
    losses = 1,
    draws = 0,
    onNameClick
}: HeaderPanelProps) {
    return (
        <div
            className="relative w-[min(440px,calc(100vw-24px))] md:w-[min(440px,50vw)] h-12 md:h-14 mx-auto flex items-center justify-between px-5 md:px-7 z-20 rounded-[16px] md:rounded-[20px]"
            style={{
                background: 'rgb(255 255 255 / 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                paddingLeft: '20px',
                paddingRight: '20px',
            }}
        >

            {/* Left: Player Name with more padding */}
            <div
                className="flex items-center gap-1.5 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onNameClick}
                role="button"
                tabIndex={0}
            >
                <div className="relative w-4 h-4 md:w-5 md:h-5">
                    <Image src="/assets/icons/user.svg" alt="User" fill />
                </div>
                <span className="text-sm md:text-base font-semibold text-[#8B4560]">
                    {playerName}
                </span>
            </div>

            {/* Right: Stats + Telegram grouped together */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Stats with glassmorphism background */}
                <div
                    className="flex items-center gap-2 md:gap-3 py-1.5 rounded-full"
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                    }}
                >
                    <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                            <Image src="/assets/icons/trophy.svg" alt="Wins" fill />
                        </div>
                        <span className="text-sm font-medium text-[#8B4560]">{wins}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                            <Image src="/assets/icons/sad.svg" alt="Losses" fill />
                        </div>
                        <span className="text-sm font-medium text-[#8B4560]">{losses}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                            <Image src="/assets/icons/handshake.svg" alt="Draws" fill />
                        </div>
                        <span className="text-sm font-medium text-[#8B4560]">{draws}</span>
                    </div>
                </div>

                {/* Telegram Button */}
                <a
                    href="https://t.me/tictactoepromobot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-8 h-8 md:w-9 md:h-9 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
                    aria-label="Open Telegram"
                >
                    <Image src="/assets/icons/telegram.svg" alt="Telegram" fill />
                </a>
            </div>
        </div>
    );
}
