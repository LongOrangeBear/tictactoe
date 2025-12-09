'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useGame } from '@/hooks/useGame';
import { usePlayerName } from '@/hooks/usePlayerName';
import { Board } from '@/components/game/Board';
import { GameStatus } from '@/components/game/GameStatus';
import { HeaderPanel } from '@/components/ui/HeaderPanel';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { WinModal } from '@/components/modals/WinModal';
import { LoseModal } from '@/components/modals/LoseModal';
import { DrawModal } from '@/components/modals/DrawModal';
import { WelcomeModal } from '@/components/modals/WelcomeModal';

export default function Home() {
  const { theme } = useTheme();
  const { name, isLoading, hasName, saveName, clearName } = usePlayerName();
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
      className="min-h-screen min-h-dvh flex flex-col items-center justify-start relative z-10"
      style={{
        paddingTop: 'max(12px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
    >
      <WelcomeModal isOpen={!hasName} onSubmit={saveName} />

      {/* Top section: Header + Theme + Status + Board */}
      <div className="w-full flex flex-col items-center gap-2 md:gap-4 md:pt-4">
        {/* Header Panel - includes name, stats, telegram */}
        {hasName && name && (
          <HeaderPanel
            playerName={name}
            wins={stats.wins}
            losses={stats.losses}
            draws={stats.draws}
            onNameClick={clearName}
          />
        )}

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Game Status - under theme switcher */}
        {!result && (
          <GameStatus isPlayerTurn={isPlayerTurn} isProcessing={isProcessing} />
        )}

        {/* Game Board - under status, pushed down on mobile */}
        <div className="mt-8 md:mt-0">
          <Board
            board={board}
            winningLine={winningLine}
            disabled={!isPlayerTurn || result !== null || isProcessing}
            onCellClick={makeMove}
          />
        </div>
      </div>

      {/* Modals */}
      <WinModal isOpen={result === 'win'} promoCode={promoCode || ''} onPlayAgain={resetGame} />
      <LoseModal isOpen={result === 'lose'} onPlayAgain={resetGame} />
      <DrawModal isOpen={result === 'draw'} onPlayAgain={resetGame} />
    </div>
  );
}
