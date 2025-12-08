import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Крестики-Нолики | Выиграй промокод!",
  description: "Сыграйте в крестики-нолики и получите промокод на скидку при победе!",
  keywords: ["крестики-нолики", "игра", "промокод", "скидка"],
  authors: [{ name: "Tic-Tac-Toe Game" }],
  openGraph: {
    title: "Крестики-Нолики | Выиграй промокод!",
    description: "Сыграйте в крестики-нолики и получите промокод на скидку при победе!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ec4899',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SoundProvider>
            <div className="bg-pattern" />
            <main className="relative z-10">
              {children}
            </main>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
