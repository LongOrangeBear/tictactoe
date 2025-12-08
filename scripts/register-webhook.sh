#!/bin/bash
# Script to register Telegram webhook after Vercel deployment
# Usage: ./scripts/register-webhook.sh https://your-app.vercel.app

if [ -z "$1" ]; then
    echo "Usage: ./scripts/register-webhook.sh <VERCEL_URL>"
    echo "Example: ./scripts/register-webhook.sh https://tictactoe.vercel.app"
    exit 1
fi

VERCEL_URL=$1
BOT_TOKEN="8565932348:AAGERjnxBElZyeJog9zTC2xmga1FP9OlGAo"
WEBHOOK_URL="${VERCEL_URL}/api/telegram/webhook"

echo "🔗 Registering webhook..."
echo "   URL: ${WEBHOOK_URL}"

curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
    -H "Content-Type: application/json" \
    -d "{\"url\": \"${WEBHOOK_URL}\"}"

echo ""
echo ""
echo "✅ Done! Verify with:"
echo "   curl https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo"
