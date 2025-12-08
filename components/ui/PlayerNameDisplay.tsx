'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface PlayerNameDisplayProps {
    name: string;
    onEdit: (newName: string) => void;
}

export function PlayerNameDisplay({ name, onEdit }: PlayerNameDisplayProps) {
    const { theme } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(name);

    const handleSubmit = () => {
        const trimmedName = editValue.trim();
        if (trimmedName && trimmedName.length >= 2 && trimmedName.length <= 20) {
            onEdit(trimmedName);
        } else {
            setEditValue(name);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
        else if (e.key === 'Escape') { setEditValue(name); setIsEditing(false); }
    };

    return (
        <motion.div className="text-center mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.input
                        key="input"
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                        className="px-2 py-1 rounded-lg text-center text-xs outline-none"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            color: theme.colors.text,
                            border: `1px solid ${theme.colors.primary}`,
                        }}
                        autoFocus
                        maxLength={20}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                ) : (
                    <motion.button
                        key="display"
                        onClick={() => { setEditValue(name); setIsEditing(true); }}
                        className="px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 mx-auto"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            color: theme.colors.text,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <span>👤</span>
                        <span>{name}</span>
                        <span className="opacity-50 text-[10px]">✏️</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
