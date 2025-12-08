'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playClick: () => void;
    playWin: () => void;
    playLose: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const STORAGE_KEY = 'tictactoe-sound-muted';

// Audio URLs (using web audio synthesis for simplicity)
function createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): () => void {
    return () => {
        try {
            const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch {
            // Audio not available
        }
    };
}

// Create pleasant sound effects
const clickSound = createBeep(520, 0.1, 'sine');
const winSound = () => {
    // Play a happy arpeggio
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
        setTimeout(() => createBeep(freq, 0.2, 'sine')(), i * 100);
    });
};
const loseSound = () => {
    // Play a sad descending sound
    const notes = [392, 349, 330, 294]; // G4, F4, E4, D4
    notes.forEach((freq, i) => {
        setTimeout(() => createBeep(freq, 0.25, 'triangle')(), i * 150);
    });
};

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedMuted = localStorage.getItem(STORAGE_KEY);
        if (savedMuted !== null) {
            setIsMuted(savedMuted === 'true');
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem(STORAGE_KEY, String(isMuted));
        }
    }, [isMuted, mounted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const playClick = useCallback(() => {
        if (!isMuted) clickSound();
    }, [isMuted]);

    const playWin = useCallback(() => {
        if (!isMuted) winSound();
    }, [isMuted]);

    const playLose = useCallback(() => {
        if (!isMuted) loseSound();
    }, [isMuted]);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playClick, playWin, playLose }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
