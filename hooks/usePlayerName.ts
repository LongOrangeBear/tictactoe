'use client';

import { useState, useEffect, useCallback } from 'react';

const PLAYER_NAME_KEY = 'tictactoe-player-name';

export function usePlayerName() {
    const [name, setName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load name from localStorage
    useEffect(() => {
        const savedName = localStorage.getItem(PLAYER_NAME_KEY);
        setName(savedName);
        setIsLoading(false);
    }, []);

    // Save name to localStorage
    const saveName = useCallback((newName: string) => {
        const trimmedName = newName.trim();
        if (trimmedName) {
            localStorage.setItem(PLAYER_NAME_KEY, trimmedName);
            setName(trimmedName);
        }
    }, []);

    // Clear name (for testing)
    const clearName = useCallback(() => {
        localStorage.removeItem(PLAYER_NAME_KEY);
        setName(null);
    }, []);

    return {
        name,
        isLoading,
        hasName: !!name,
        saveName,
        clearName,
    };
}
