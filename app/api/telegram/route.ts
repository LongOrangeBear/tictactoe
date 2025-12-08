import { NextRequest, NextResponse } from 'next/server';

interface TelegramRequestBody {
    type: 'win' | 'lose';
    promoCode?: string;
    playerName?: string;
    totalWins?: number;
}

export async function POST(request: NextRequest) {
    try {
        const body: TelegramRequestBody = await request.json();

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Missing Telegram credentials');
            return NextResponse.json(
                { error: 'Telegram configuration missing', success: false },
                { status: 500 }
            );
        }

        const playerDisplay = body.playerName || 'Игрок';
        let message: string;

        if (body.type === 'win' && body.promoCode) {
            const winCount = body.totalWins || 1;
            const winWord = getWinWord(winCount);
            message = `🎉 <b>${playerDisplay}</b> выиграл(а) ${winCount}-й ${winWord} и получает промокод!\n\n<code>${body.promoCode}</code>`;
        } else if (body.type === 'lose') {
            message = `😔 <b>${playerDisplay}</b> проиграл(а)`;
        } else {
            return NextResponse.json(
                { error: 'Invalid request body', success: false },
                { status: 400 }
            );
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        console.log('Sending to Telegram:', { chatId, message });

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        const responseData = await response.json();
        console.log('Telegram API response:', responseData);

        if (!response.ok || !responseData.ok) {
            console.error('Telegram API error:', responseData);
            return NextResponse.json(
                { error: 'Failed to send Telegram message', details: responseData, success: false },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in Telegram API route:', error);
        return NextResponse.json(
            { error: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}

// Helper function for proper Russian word forms
function getWinWord(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'раз';
    }

    if (lastDigit === 1) {
        return 'раз';
    }

    return 'раз';
}
