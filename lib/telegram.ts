interface TelegramMessage {
    type: 'win' | 'lose';
    promoCode?: string;
    playerName?: string;
    totalWins?: number;
}

export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
    try {
        const response = await fetch('/api/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            return true;
        }

        // Only log error if it's a real failure
        if (result.error) {
            console.warn('Telegram notification issue:', result.error);
        }

        return response.ok;
    } catch (error) {
        // Silent fail - don't break the game for Telegram issues
        console.warn('Telegram notification failed:', error);
        return false;
    }
}

// Generate deep link for Telegram bot personal message
export function generateTelegramDeepLink(promoCode: string): string {
    const botUsername = 'tictactoepromobot';
    // Encode promo code for URL safety
    const encodedPromo = encodeURIComponent(`PROMO_${promoCode}`);
    return `https://t.me/${botUsername}?start=${encodedPromo}`;
}
