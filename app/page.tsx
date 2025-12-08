'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useGame } from '@/hooks/useGame';
import { usePlayerName } from '@/hooks/usePlayerName';
import { Board } from '@/components/game/Board';
import { GameStatus } from '@/components/game/GameStatus';
import { Statistics } from '@/components/ui/Statistics';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { PlayerNameDisplay } from '@/components/ui/PlayerNameDisplay';
import { WinModal } from '@/components/modals/WinModal';
import { LoseModal } from '@/components/modals/LoseModal';
import { DrawModal } from '@/components/modals/DrawModal';
import { WelcomeModal } from '@/components/modals/WelcomeModal';

export default function Home() {
  const { theme } = useTheme();
  const { name, isLoading, hasName, saveName } = usePlayerName();
  const {
    board,
    isPlayerTurn,
    result,
    winningLine,
    promoCode,
    isProcessing,
    stats,
    makeMove,
    resetGame,
    resetStats,
  } = useGame(name);

  if (isLoading) {
    return (
      <div className="min-h-screen min-h-dvh flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          ✨
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen min-h-dvh flex flex-col items-center px-4 py-4 sm:py-6 relative z-10 overflow-y-auto"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <SoundToggle />
      <WelcomeModal isOpen={!hasName} onSubmit={saveName} />

      {/* Header - compact */}
      <motion.header
        className="text-center mb-3 w-full max-w-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold mb-1"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Крестики-Нолики
        </h1>
        <p className="text-xs sm:text-sm" style={{ color: theme.colors.textMuted }}>
          Победите и получите промокод! 🎁
        </p>
      </motion.header>

      {/* Player Name */}
      {hasName && name && <PlayerNameDisplay name={name} onEdit={saveName} />}

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Game Status */}
      {!result && <GameStatus isPlayerTurn={isPlayerTurn} isProcessing={isProcessing} />}

      {/* Game Board */}
      <Board
        board={board}
        winningLine={winningLine}
        disabled={!isPlayerTurn || result !== null || isProcessing}
        onCellClick={makeMove}
      />

      {/* Statistics */}
      <Statistics stats={stats} onReset={resetStats} />

      {/* Telegram Link */}
      <motion.a
        href="https://t.me/tictactoepromo"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium glass-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ color: theme.colors.text }}
      >
        <span>📢</span>
        <span>Telegram</span>
      </motion.a>

      {/* Modals */}
      <WinModal isOpen={result === 'win'} promoCode={promoCode || ''} onPlayAgain={resetGame} />
      <LoseModal isOpen={result === 'lose'} onPlayAgain={resetGame} />
      <DrawModal isOpen={result === 'draw'} onPlayAgain={resetGame} />
    </div>
  );
}
