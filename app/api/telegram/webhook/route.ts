import { NextRequest, NextResponse } from 'next/server';

interface TelegramUpdate {
    update_id: number;
    message?: {
        message_id: number;
        from: {
            id: number;
            first_name: string;
        };
        chat: {
            id: number;
            type: string;
        };
        text?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const update: TelegramUpdate = await request.json();
        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        if (!botToken) {
            console.error('Missing TELEGRAM_BOT_TOKEN');
            return NextResponse.json({ ok: true });
        }

        // Check if it's a /start command
        const message = update.message;
        if (!message?.text) {
            return NextResponse.json({ ok: true });
        }

        const text = message.text;
        const chatId = message.chat.id;
        const firstName = message.from.first_name || 'друг';

        // Handle /start with promo code
        if (text.startsWith('/start')) {
            const parts = text.split(' ');

            if (parts.length > 1 && parts[1].startsWith('PROMO_')) {
                // User came from deep link with promo code
                const promoCode = parts[1].replace('PROMO_', '');

                await sendMessage(botToken, chatId,
                    `🎉 Привет, ${firstName}!\n\n` +
                    `Твой промокод: <code>${promoCode}</code>\n\n` +
                    `Используй его при оформлении заказа для получения скидки! 🎁`
                );
            } else {
                // Regular /start
                await sendMessage(botToken, chatId,
                    `👋 Привет, ${firstName}!\n\n` +
                    `Играй в Крестики-Нолики и выигрывай промокоды!\n\n` +
                    `🎮 Ссылка на игру появится после деплоя`
                );
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ ok: true });
    }
}

async function sendMessage(botToken: string, chatId: number, text: string) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
        }),
    });
}

// Telegram requires GET for webhook verification
export async function GET() {
    return NextResponse.json({
        status: 'Telegram webhook endpoint',
        usage: 'Register this URL with Telegram Bot API'
    });
}
