# Спецификация дизайна — Крестики-Нолики

> ⚠️ **ВАЖНО:** Весь визуал создаётся **С НУЛЯ**, не адаптируя старые элементы.

---

## 🔐 Права и правила выполнения

### Сервер
- ✅ Агент **МОЖЕТ САМ** запускать/перезапускать dev-сервер (`npm run dev`)
- ✅ Агент **МОЖЕТ САМ** останавливать сервер при необходимости
- Команда: `cd /home/meow/work/tictactoe && npm run dev`

### Строгие правила чекпоинтов
> 🛑 **СТРОГО СЛЕДОВАТЬ ЧЕКПОИНТАМ!** Нельзя пропускать или объединять шаги.

На **КАЖДОМ** этапе проверяем:
- [ ] **Позиция** — X, Y координаты элемента
- [ ] **Размеры** — Width, Height точно как в схеме
- [ ] **Отступы** — margin, padding, gap
- [ ] **Скругления** — border-radius
- [ ] **Цвета** — background, border, text color
- [ ] **Прозрачность** — rgba alpha значения
- [ ] **Blur эффекты** — backdrop-filter значения
- [ ] **Тени** — box-shadow
- [ ] **Шрифты** — font-size, font-weight, line-height
- [ ] **Анимации** — transitions, keyframes (если есть на этапе)

**НЕ ТОЛЬКО функциональность — ВИЗУАЛ должен быть pixel-perfect!**

## 🛠️ Библиотеки и настройки

### Основные зависимости
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "framer-motion": "^10.16.0",
    "canvas-confetti": "^1.9.0",
    "lucide-react": "^0.294.0"
  }
}
```

### Framer Motion — настройки анимаций
```typescript
// Стандартные transition для всех компонентов
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

const fadeInTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
};

const modalTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1]
};
```

### Lucide React — иконки
```typescript
import { Send } from 'lucide-react'; // Telegram иконка
// Размер: 20px для mobile, 22px для desktop
// Цвет: white
// strokeWidth: 2
```

### Canvas Confetti — победа
```typescript
import confetti from 'canvas-confetti';

// Настройки для победы
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#ff6b8a', '#ffd93d', '#6bcb77', '#9b59b6']
});
```

---

## 📐 Мокапы

### Mobile (375×812px) — Тема Love
![Mobile](/home/meow/work/tictactoe/design_spec/mobile_mockup_v5_1765225685622.png)

### Desktop (1440×900px)
![Desktop](/home/meow/work/tictactoe/design_spec/desktop_mockup_v2_1765226602227.png)

### Все темы
````carousel
![Love](/home/meow/work/tictactoe/design_spec/mobile_mockup_v5_1765225685622.png)
<!-- slide -->
![Star](/home/meow/work/tictactoe/design_spec/theme_star_mockup_1765227242712.png)
<!-- slide -->
![Nature](/home/meow/work/tictactoe/design_spec/theme_nature_mockup_1765227263282.png)
<!-- slide -->
![Night](/home/meow/work/tictactoe/design_spec/theme_night_mockup_1765227283515.png)
````

### Модальные окна
````carousel
![Win](/home/meow/work/tictactoe/design_spec/win_modal_mockup_1765226325939.png)
<!-- slide -->
![Lose](/home/meow/work/tictactoe/design_spec/lose_modal_mockup_1765226349262.png)
<!-- slide -->
![Draw](/home/meow/work/tictactoe/design_spec/draw_modal_mockup_1765226367627.png)
````

## 📏 Схематичные мокапы с точными размерами

> 🔍 **НА КАЖДОМ ШАГЕ:** Сравниваем результат с мокапом, проверяем пропорции, размеры и положение пиксель-в-пиксель.

---

### Mobile Layout (375×812px)

```
┌─────────────────────────────────────────┐ ← 0px
│                16px margin              │
├─────────────────────────────────────────┤ ← 16px
│ ┌─────────────────────────────────────┐ │
│ │  HEADER PANEL                       │ │ ← height: 48px
│ │  w: 343px (375-32)                  │ │    border-radius: 16px
│ │  ┌──────┐        ┌─────┐  ┌──────┐  │ │
│ │  │👤Тест│        │🏆😢🤝│  │  ✈️  │  │ │
│ │  │14px  │        │14px │  │36×36 │  │ │
│ │  └──────┘        └─────┘  └──────┘  │ │
│ └─────────────────────────────────────┘ │
│                12px gap                 │
├─────────────────────────────────────────┤ ← 76px
│      "Победите и получите промокод!"    │ ← height: 24px
│         font-size: 16px, center         │    line-height: 24px
│                12px gap                 │
├─────────────────────────────────────────┤ ← 112px
│ ┌─────────────────────────────────────┐ │
│ │  THEME PANEL                        │ │ ← height: 68px
│ │  w: 343px, padding: 12px 20px       │ │    border-radius: 20px
│ │  ┌────┐  ┌────┐  ┌────┐  ┌────┐     │ │
│ │  │ ❤️ │  │ ⭐ │  │ 🍀 │  │ 🌙 │     │ │ ← buttons: 52×52px
│ │  └────┘  └────┘  └────┘  └────┘     │ │    gap: 16px
│ │       font-size: 24px               │ │    border-radius: 50%
│ └─────────────────────────────────────┘ │
│                16px gap                 │
├─────────────────────────────────────────┤ ← 196px
│ ┌─────────────────────────────────────┐ │
│ │  GAME BOARD                         │ │ ← width: 280px
│ │  centered, aspect-ratio: 1          │ │    height: 280px
│ │  padding: 12px, gap: 8px            │ │    border-radius: 24px
│ │  ┌─────┬─────┬─────┐                │ │
│ │  │     │     │     │  cell: 80×80px │ │ ← cell border-radius: 16px
│ │  ├─────┼─────┼─────┤  r: 16px       │ │    font-size: 2rem
│ │  │     │     │     │                │ │
│ │  ├─────┼─────┼─────┤                │ │
│ │  │     │     │     │                │ │
│ │  └─────┴─────┴─────┘                │ │
│ └─────────────────────────────────────┘ │
│                16px gap                 │
├─────────────────────────────────────────┤ ← 492px
│        ┌─────────────────────┐          │
│        │  GAME STATUS        │          │ ← height: 44px
│        │  "Ваш ход ❤️"       │          │    padding: 0 24px
│        │  font: 18px         │          │    border-radius: 16px
│        └─────────────────────┘          │
│                                         │
└─────────────────────────────────────────┘ ← 812px
```

**Mobile: Точные значения**
| Элемент | X | Y | Width | Height | Детали |
|---------|---|---|-------|--------|--------|
| Header | 16px | 16px | 343px | 48px | r:16px, p:0 16px |
| Имя игрока | 32px | 32px | auto | 24px | font:14px |
| Статистика | — | 32px | auto | 24px | gap:12px, font:14px |
| Telegram btn | 323px | 22px | 36px | 36px | r:50% |
| Promo | center | 76px | 343px | 24px | font:16px |
| Theme Panel | 16px | 112px | 343px | 68px | r:20px, p:12 20 |
| Theme btn | — | — | 52px | 52px | r:50%, font:24px |
| Board | 47px | 196px | 280px | 280px | r:24px, p:12, gap:8 |
| Cell | — | — | 80px | 80px | r:16px |
| Status | center | 492px | auto | 44px | r:16px, font:18px |

---

### Desktop Layout (1440×900px)

```
┌─────────────────────────────────────────────────────────────┐ ← 0px
│                         24px margin                         │
├─────────────────────────────────────────────────────────────┤ ← 24px
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  HEADER PANEL                                           │ │ ← height: 56px
│ │  w: 1392px (1440-48), border-radius: 20px               │ │
│ │  ┌────────┐              ┌──────────┐    ┌────────┐     │ │
│ │  │👤 Тест │              │🏆2 😢1 🤝0│    │   ✈️   │     │ │
│ │  │16px    │              │16px      │    │40×40px │     │ │
│ │  └────────┘              └──────────┘    └────────┘     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                          16px gap                           │
├─────────────────────────────────────────────────────────────┤ ← 96px
│           "Победите и получите промокод! 🎁"                │ ← height: 28px
│              font-size: 20px, center                        │    line-height: 28px
│                          16px gap                           │
├─────────────────────────────────────────────────────────────┤ ← 140px
│       ┌───────────────────────────────────────────┐         │
│       │  THEME PANEL                              │         │ ← height: 76px
│       │  w: auto, padding: 14px 24px              │         │    border-radius: 24px
│       │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │         │
│       │  │  ❤️  │  │  ⭐  │  │  🍀  │  │  🌙  │   │         │ ← buttons: 56×56px
│       │  └──────┘  └──────┘  └──────┘  └──────┘   │         │    gap: 20px
│       │          font-size: 28px                  │         │    border-radius: 50%
│       └───────────────────────────────────────────┘         │
│                          20px gap                           │
├─────────────────────────────────────────────────────────────┤ ← 236px
│                                                             │
│           ┌───────────────────────────────────┐             │
│           │  GAME BOARD                       │             │ ← width: 420px
│           │  centered, aspect-ratio: 1        │             │    height: 420px
│           │  padding: 16px, gap: 12px         │             │    border-radius: 28px
│           │  ┌───────┬───────┬───────┐        │             │
│           │  │       │       │       │ 124px  │             │ ← cell: 124×124px
│           │  ├───────┼───────┼───────┤  r:20  │             │    border-radius: 20px
│           │  │       │       │       │        │             │    font-size: 3rem
│           │  ├───────┼───────┼───────┤        │             │
│           │  │       │       │       │        │             │
│           │  └───────┴───────┴───────┘        │             │
│           └───────────────────────────────────┘             │
│                          20px gap                           │
├─────────────────────────────────────────────────────────────┤ ← 676px
│              ┌─────────────────────────┐                    │
│              │  GAME STATUS            │                    │ ← height: 52px
│              │  "Ваш ход ❤️"           │                    │    padding: 0 28px
│              │  font: 22px             │                    │    border-radius: 20px
│              └─────────────────────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘ ← 900px
```

**Desktop: Точные значения**
| Элемент | X | Y | Width | Height | Детали |
|---------|---|---|-------|--------|--------|
| Header | 24px | 24px | 1392px | 56px | r:20px, p:0 24px |
| Имя игрока | 48px | 40px | auto | 28px | font:16px |
| Статистика | — | 40px | auto | 28px | gap:16px, font:16px |
| Telegram btn | 1376px | 32px | 40px | 40px | r:50% |
| Promo | center | 96px | auto | 28px | font:20px |
| Theme Panel | center | 140px | auto | 76px | r:24px, p:14 24 |
| Theme btn | — | — | 56px | 56px | r:50%, font:28px |
| Board | 510px | 236px | 420px | 420px | r:28px, p:16, gap:12 |
| Cell | — | — | 124px | 124px | r:20px |
| Status | center | 676px | auto | 52px | r:20px, font:22px |

---

### Modal Layout (оба размера)

```
┌─────────────────────────────────────────┐
│            OVERLAY                      │ ← background: rgba(0,0,0,0.4)
│            backdrop-filter: blur(8px)   │    position: fixed, inset: 0
│                                         │
│     ┌───────────────────────────────┐   │
│     │  MODAL CARD                   │   │ ← width: min(90vw, 380px)
│     │  border-radius: 28px          │   │    padding: 32px 24px
│     │  padding: 32px 24px           │   │    backdrop-filter: blur(24px)
│     │                               │   │
│     │         🎉                    │   │ ← emoji: 56px, mb: 16px
│     │                               │   │
│     │     "Поздравляем!"            │   │ ← title: 28px, gradient
│     │                               │   │    margin-bottom: 8px
│     │   "Ваш промокод:"             │   │ ← subtitle: 16px
│     │                               │   │    margin-bottom: 16px
│     │  ┌─────────────────────────┐  │   │
│     │  │    WINNER2024           │  │   │ ← promo-box: p:16px
│     │  │    24px, monospace      │  │   │    dashed border
│     │  └─────────────────────────┘  │   │    margin-bottom: 16px
│     │                               │   │
│     │  ┌──────────┐ ┌──────────┐    │   │ ← action btns: h:48px
│     │  │📋 Copy   │ │📩 Telegram│   │   │    gap: 12px, r:12px
│     │  └──────────┘ └──────────┘    │   │    margin-bottom: 16px
│     │                               │   │
│     │  ┌─────────────────────────┐  │   │
│     │  │   Сыграть ещё раз       │  │   │ ← primary btn: h:52px
│     │  │   gradient, shimmer     │  │   │    border-radius: 16px
│     │  └─────────────────────────┘  │   │
│     │                               │   │
│     └───────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**Modal: Точные значения**
| Элемент | Width | Height | Детали |
|---------|-------|--------|--------|
| Card | min(90vw, 380px) | auto | r:28px, p:32 24 |
| Emoji | 56px | 56px | mb:16px |
| Title | 100% | auto | font:28px, mb:8px |
| Subtitle | 100% | auto | font:16px, mb:16px |
| Promo box | 100% | auto | p:16px, r:12px, mb:16px |
| Action btns | 100% | 48px each | gap:12px, r:12px |
| Primary btn | 100% | 52px | r:16px, gradient |

---

## 🎨 Цветовые схемы тем

```css
/* Love Theme */
[data-theme="love"] {
  --primary: hsl(340, 80%, 60%);
  --secondary: hsl(320, 70%, 70%);
  --glow: rgba(255, 100, 130, 0.4);
  --bg-start: hsl(340, 80%, 95%);
  --bg-mid: hsl(320, 60%, 92%);
  --bg-end: hsl(300, 70%, 94%);
}

/* Star Theme */
[data-theme="star"] {
  --primary: hsl(45, 90%, 55%);
  --secondary: hsl(35, 85%, 60%);
  --glow: rgba(255, 200, 50, 0.4);
  --bg-start: hsl(45, 80%, 95%);
  --bg-mid: hsl(35, 70%, 92%);
  --bg-end: hsl(25, 60%, 94%);
}

/* Nature Theme */
[data-theme="nature"] {
  --primary: hsl(140, 60%, 45%);
  --secondary: hsl(160, 50%, 55%);
  --glow: rgba(100, 200, 100, 0.4);
  --bg-start: hsl(140, 60%, 95%);
  --bg-mid: hsl(160, 50%, 92%);
  --bg-end: hsl(120, 40%, 94%);
}

/* Night Theme */
[data-theme="night"] {
  --primary: hsl(260, 60%, 55%);
  --secondary: hsl(240, 50%, 45%);
  --glow: rgba(100, 100, 200, 0.4);
  --bg-start: hsl(260, 40%, 20%);
  --bg-mid: hsl(240, 35%, 15%);
  --bg-end: hsl(280, 30%, 18%);
}
```

---

## 📦 Компоненты — как создавать

### 1. Background (globals.css)

**Создать в:** `app/globals.css`

```css
body {
  min-height: 100dvh;
  background: linear-gradient(135deg, 
    var(--bg-start) 0%, 
    var(--bg-mid) 50%, 
    var(--bg-end) 100%);
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: 
    radial-gradient(ellipse 80% 50% at 20% 10%, 
      color-mix(in srgb, var(--primary) 40%, transparent) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 90%, 
      color-mix(in srgb, var(--secondary) 30%, transparent) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 50% 50%, 
      color-mix(in srgb, var(--primary) 20%, transparent) 0%, transparent 40%);
  filter: blur(60px);
  animation: meshFloat 20s ease-in-out infinite;
}

@keyframes meshFloat {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(3deg); }
}
```

---

### 2. Header Panel

**Создать файл:** `components/ui/HeaderPanel.tsx`

**Размеры:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| width | calc(100% - 32px) | calc(100% - 48px) |
| height | 48px | 56px |
| margin | 16px | 24px |
| padding-x | 16px | 24px |
| border-radius | 16px | 20px |

**CSS:**
```css
.header-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 32px);
  height: 48px;
  margin: 16px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

@media (min-width: 768px) {
  .header-panel {
    width: calc(100% - 48px);
    height: 56px;
    margin: 24px;
    padding: 0 24px;
    border-radius: 20px;
  }
}
```

**Внутренние элементы:**

```css
/* Имя игрока — слева */
.player-name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: hsl(340, 50%, 30%);
}

@media (min-width: 768px) {
  .player-name { font-size: 16px; }
}

/* Статистика — справа от имени, ближе к Telegram */
.stats {
  display: flex;
  gap: 12px;
  margin-left: auto;
  margin-right: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

/* Telegram кнопка */
.telegram-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0088cc, #00aaff);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.telegram-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 136, 204, 0.4);
}

@media (min-width: 768px) {
  .telegram-btn { width: 40px; height: 40px; }
}
```

---

### 3. Promo Text

**Создать файл:** `components/ui/PromoText.tsx`

**Размеры:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| font-size | 16px | 20px |
| line-height | 24px | 28px |
| margin-bottom | 12px | 16px |

```css
.promo-text {
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: hsl(340, 50%, 35%);
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

@media (min-width: 768px) {
  .promo-text {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
}
```

---

### 4. Theme Panel

**Создать файл:** `components/ui/ThemePanel.tsx`

**Размеры панели:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| padding | 12px 20px | 14px 24px |
| gap (между кнопками) | 16px | 20px |
| border-radius | 20px | 24px |
| margin-bottom | 16px | 20px |

**Размеры кнопок:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| width/height | 52px | 56px |
| font-size (emoji) | 24px | 28px |
| border-radius | 50% | 50% |

```css
.theme-panel {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 12px 20px;
  margin: 0 16px 16px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@media (min-width: 768px) {
  .theme-panel {
    gap: 20px;
    padding: 14px 24px;
    margin: 0 24px 20px;
    border-radius: 24px;
  }
}

.theme-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid transparent;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

@media (min-width: 768px) {
  .theme-btn {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
}

.theme-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.15),
    0 0 20px var(--glow);
}

.theme-btn.active {
  border-color: var(--primary);
  box-shadow: 
    0 0 0 3px color-mix(in srgb, var(--primary) 30%, transparent),
    0 8px 24px rgba(0, 0, 0, 0.12);
}
```

---

### 5. Game Board

**Создать файл:** `components/game/Board.tsx`

**Размеры:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| width | min(280px, calc(100vw - 32px)) | min(420px, 50vw) |
| gap | 8px | 12px |
| padding | 12px | 16px |
| border-radius (board) | 24px | 28px |
| border-radius (cell) | 16px | 20px |

```css
.board-container {
  width: min(280px, calc(100vw - 32px));
  aspect-ratio: 1;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .board-container {
    width: min(420px, 50vw);
  }
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

@media (min-width: 768px) {
  .board {
    gap: 12px;
    padding: 16px;
    border-radius: 28px;
  }
}

.cell {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2rem, 8vw, 3rem);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}

@media (min-width: 768px) {
  .cell {
    border-radius: 20px;
    font-size: clamp(2.5rem, 6vw, 4rem);
  }
}

.cell:hover:not(.filled) {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.02);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.cell.winning {
  animation: winPulse 0.6s ease-in-out infinite alternate;
  box-shadow: 0 0 30px var(--glow);
}

@keyframes winPulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
```

---

### 6. Game Status

**Создать файл:** `components/game/GameStatus.tsx`

**Размеры:**
| Свойство | Mobile | Desktop |
|----------|--------|---------|
| font-size | 18px | 22px |
| padding | 12px 24px | 14px 28px |
| margin-top | 16px | 20px |
| border-radius | 16px | 20px |
| height | 44px | 52px |

```css
.game-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 24px;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  color: hsl(340, 50%, 35%);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

@media (min-width: 768px) {
  .game-status {
    height: 52px;
    padding: 0 28px;
    margin-top: 20px;
    font-size: 22px;
    border-radius: 20px;
  }
}
```

---

### 7. Win Modal

**Создать файл:** `components/modals/WinModal.tsx`

**Размеры:**
| Свойство | Value |
|----------|-------|
| width | min(90vw, 380px) |
| padding | 32px 24px |
| border-radius | 28px |
| emoji size | 56px |
| title size | 28px |
| promo-box padding | 16px |
| button height | 48px |

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

/* Card */
.modal-card {
  width: min(90vw, 380px);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(180%);
  border-radius: 28px;
  padding: 32px 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 
    0 24px 64px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  text-align: center;
  overflow: hidden;
}

/* Emoji */
.modal-emoji {
  font-size: 56px;
  margin-bottom: 16px;
}

/* Title — градиент */
.modal-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

/* Subtitle */
.modal-subtitle {
  font-size: 16px;
  color: hsl(340, 30%, 40%);
  margin-bottom: 16px;
}

/* Promo Box */
.promo-box {
  background: rgba(255, 255, 255, 0.6);
  border: 2px dashed var(--primary);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 2px;
}

/* Action buttons row */
.modal-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.btn-copy, .btn-telegram {
  flex: 1;
  height: 48px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-copy {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: hsl(340, 40%, 35%);
}

.btn-telegram {
  background: linear-gradient(135deg, #0088cc, #00aaff);
  border: none;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 136, 204, 0.3);
}

/* Primary button */
.btn-primary {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 24px color-mix(in srgb, var(--primary) 30%, transparent);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: translateX(-100%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
```

---

### 8. Lose Modal

**Идентичен Win Modal, но:**
- emoji: `💪`
- title: "Не расстраивайтесь!"
- subtitle: "В следующий раз обязательно получится!"
- Нет promo-box и action buttons
- Только btn-primary "Попробовать снова"

---

### 9. Draw Modal

**Идентичен Win Modal, но:**
- emoji: `🤝`
- title: "Ничья!"
- subtitle: "Достойная партия! Сыграем ещё?"
- Нет promo-box и action buttons
- Только btn-primary "Сыграть ещё раз"

---

## 🖼️ Готовые ассеты (Ultra-HD)

> **ВАЖНО:** Все ассеты уже сгенерированы в высоком качестве (Ultra-HD) и лежат в папке `design_spec/assets/`. Мы используем ИХ, а не генерируем новые.

### Структура ассетов

| Категория | Путь | Элементы |
|-----------|------|----------|
| **Темы** | `assets/{theme}_theme/` | `icon.svg`, `symbol_x.svg`, `symbol_o.svg` (4 темы) |
| **UI Иконки** | `assets/ui_icons/` | `user.svg`, `trophy.svg`, `sad.svg`, `handshake.svg`, `telegram.svg`, `copy.svg`, `gift.svg`, `celebration.svg`, `muscle.svg`, `robot.svg`, `replay.svg`, `home.svg`, `sound_on/off.svg`, `arrow_left.svg` |
| **UI Компоненты** | `assets/ui_components/` | `board_glass.svg`, `cell_glass.svg`, `header_panel.svg`, `theme_panel.svg`, `modal_card.svg`, `noise_texture.svg` |
| **App** | `assets/` | `favicon.svg`, `loader.svg` |

---

## 🚀 Поэтапная реализация

> ⏸️ После каждого шага — **СТОП** и ожидание одобрения/коррекции.
> 🚫 **НЕ используем emoji!** Все визуальные элементы генерируются.

### 🔄 Структура КАЖДОГО шага

```
┌─────────────────────────────────────────────────────────┐
│ ФАЗА 1: ГЕНЕРАЦИЯ (3 варианта)                         │
│ • Генерируем 3 варианта контента по референсу мокапа   │
│ • Показываем пользователю                              │
│ • Ожидаем выбор варианта                               │
├─────────────────────────────────────────────────────────┤
│ ⏸️ APPROVAL 1 → Выбор варианта                         │
├─────────────────────────────────────────────────────────┤
│ ФАЗА 2: ИНТЕГРАЦИЯ                                     │
│ • Интегрируем выбранный вариант в код                  │
│ • Применяем точные размеры из схемы                    │
├─────────────────────────────────────────────────────────┤
│ ФАЗА 3: ПРОВЕРКА (pixel-perfect)                       │
│ • Скриншот Mobile + Desktop                            │
│ • Сравнение с мокапом по чеклисту                      │
├─────────────────────────────────────────────────────────┤
│ ⏸️ CHECKPOINT → Одобрение или коррекция               │
└─────────────────────────────────────────────────────────┘
```

### 🔍 Чеклист проверки (КАЖДЫЙ шаг)

На **КАЖДОМ** этапе проверяем:
- [ ] **Позиция** — X, Y координаты
- [ ] **Размеры** — Width, Height
- [ ] **Отступы** — margin, padding, gap
- [ ] **Скругления** — border-radius
- [ ] **Цвета** — точное соответствие мокапу
- [ ] **Прозрачность** — rgba alpha
- [ ] **Blur эффекты** — backdrop-filter
- [ ] **Тени** — box-shadow
- [ ] **Шрифты** — font-size, weight
- [ ] **Анимации** — если есть на этапе

### 👤 Роли и специализации

| Роль | Фокус | Шаги |
|------|-------|------|
| **Frontend Architect** | Grid, flexbox, responsive | 1, 5, 9, 16 |
| **UI Designer** | Цвета, glassmorphism, blur | 2-4, 6, 10-11, 17-18, 22 |
| **UX Specialist** | Spacing, touch targets | 7, 8, 13, 14 |
| **Motion Designer** | Hover, transitions, animations | 12, 15, 19-21 |
| **QA Visual** | Pixel-perfect проверка | ВСЕ шаги |

---

### ШАГ 1: Сетка игрового поля
**👤 Роль:** Frontend Architect

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовые ассеты для сетки и фона доски:
- `assets/ui_components/board_glass.svg` (фон и рамка)
- CSS Grid для разметки ячеек

⏸️ **APPROVAL 1** → Проверка наличия ассетов

**🔧 ФАЗА 2: Интеграция**
- Board с 3×3 grid
- gap: 8px mobile, 12px desktop
- width: 280px mobile, 420px desktop

**✅ ФАЗА 3: Проверка**
- [ ] Mobile — сетка 280×280px, gap 8px
- [ ] Desktop — сетка 420×420px, gap 12px
- [ ] Ячейки квадратные (aspect-ratio: 1)
- [ ] Grid центрирован по X

⏸️ **CHECKPOINT 1** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 2: Фон ячеек
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет для ячейки:
- `assets/ui_components/cell_glass.svg`

⏸️ **APPROVAL 2** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- background: rgba(255, 255, 255, 0.7)
- backdrop-filter: blur(12px)
- border-radius: 16px mobile, 20px desktop
- border: 1px solid rgba(255, 255, 255, 0.5)
- box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05)

**✅ ФАЗА 3: Проверка**
- [ ] Цвет фона: полупрозрачный белый
- [ ] Blur эффект виден
- [ ] border-radius: 16px (mobile) / 20px (desktop)
- [ ] gap создаёт "линии"
- [ ] Тень под ячейками

⏸️ **CHECKPOINT 2** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 3: Фон доски (контейнер)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет для контейнера доски:
- `assets/ui_components/board_glass.svg`

⏸️ **APPROVAL 3** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- background: rgba(255, 255, 255, 0.4)
- backdrop-filter: blur(16px)
- padding: 12px mobile, 16px desktop
- border-radius: 24px mobile, 28px desktop
- box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1)

**✅ ФАЗА 3: Проверка**
- [ ] Контейнер виден вокруг сетки
- [ ] Padding: 12px (mobile) / 16px (desktop)
- [ ] border-radius: 24px (mobile) / 28px (desktop)
- [ ] Blur эффект (16px)
- [ ] box-shadow даёт глубину

⏸️ **CHECKPOINT 3** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 4: Фон страницы (gradient mesh)
**👤 Роль:** UI Designer + Motion Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет шума и CSS градиенты:
- `assets/ui_components/noise_texture.svg`
- CSS градиенты для каждой темы (см. раздел Цветовые схемы)

⏸️ **APPROVAL 4** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- base gradient (pink-purple)
- ::before с radial-gradients + blur(60px)
- animation: meshFloat 20s infinite

**✅ ФАЗА 3: Проверка**
- [ ] Цвета соответствуют мокапу
- [ ] Blur (60px) размывает пятна
- [ ] Анимация плавная (не дёргается)
- [ ] Работает на Mobile и Desktop

⏸️ **CHECKPOINT 4** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 5: Header Panel (структура)
**👤 Роль:** Frontend Architect

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем layout header:
- Вариант A: Компактный с tight spacing
- Вариант B: Просторный как в мокапе
- Вариант C: С дополнительным padding

Референс: Header из мокапа

⏸️ **APPROVAL 5** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- Flex контейнер: justify-content: space-between
- height: 48px mobile, 56px desktop
- margin: 16px mobile, 24px desktop
- width: calc(100% - 32px) mobile, calc(100% - 48px) desktop

**✅ ФАЗА 3: Проверка**
- [ ] Y: 16px (mobile) / 24px (desktop)
- [ ] Height: 48px (mobile) / 56px (desktop)
- [ ] Width: 343px (mobile) / 1392px (desktop)
- [ ] Flex layout работает

⏸️ **CHECKPOINT 5** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 6: Header Panel (glassmorphism фон)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет для панели хедера:
- `assets/ui_components/header_panel.svg`

⏸️ **APPROVAL 6** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- background: rgba(255, 255, 255, 0.7)
- backdrop-filter: blur(20px) saturate(180%)
- border-radius: 16px mobile, 20px desktop
- border: 1px solid rgba(255, 255, 255, 0.4)
- box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)

**✅ ФАЗА 3: Проверка**
- [ ] Glassmorphism эффект виден
- [ ] border-radius: 16px (mobile) / 20px (desktop)
- [ ] Blur размывает фон за панелью
- [ ] Тень соответствует мокапу

⏸️ **CHECKPOINT 6** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 7: Header — иконки и контент
**👤 Роль:** UX Specialist + UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовые Ultra-HD иконки из `assets/ui_icons/`:
- `user.svg` (Игрок)
- `trophy.svg` (Победы)
- `sad.svg` (Поражения)
- `handshake.svg` (Ничьи)
- `telegram.svg` (Кнопка)
- `robot.svg` (Бот - опционально)

⏸️ **APPROVAL 7** → Проверка иконок

**🔧 ФАЗА 2: Интеграция**
- Имя слева с user icon
- Статистика справа: 🏆2 😢1 🤝0 (или выбранные иконки)
- Telegram кнопка: 36×36px mobile, 40×40px desktop
- gap: 12px между stats items

**✅ ФАЗА 3: Проверка**
- [ ] Имя слева, статистика справа
- [ ] Telegram кнопка: 36px (mobile) / 40px (desktop)
- [ ] gap: 12px между элементами статистики
- [ ] Все иконки видны и соответствуют мокапу

⏸️ **CHECKPOINT 7** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 8: Promo Text
**👤 Роль:** UX Specialist

**🎨 ФАЗА 1: Подготовка ассетов**
Используем CSS стилизацию и иконку подарка:
- `assets/ui_icons/gift.svg`

⏸️ **APPROVAL 8** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- Текст: "Победите и получите промокод! 🎁"
- text-align: center
- font-size: 16px mobile, 20px desktop
- font-weight: 600
- color: hsl(340, 50%, 35%)

**✅ ФАЗА 3: Проверка**
- [ ] Y: 76px (mobile) / 96px (desktop)
- [ ] font-size: 16px (mobile) / 20px (desktop)
- [ ] Центрирование
- [ ] margin-bottom: 12px (mobile) / 16px (desktop)

⏸️ **CHECKPOINT 8** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 9: Theme Panel (структура)
**👤 Роль:** Frontend Architect

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем layout панели тем:
- Вариант A: Tight 4-button row
- Вариант B: Spacious как в мокапе
- Вариант C: С дополнительным decoration

Референс: Theme Panel из мокапа

⏸️ **APPROVAL 9** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- Flex контейнер, justify-content: center
- gap: 16px mobile, 20px desktop
- padding: 12px 20px mobile, 14px 24px desktop
- margin: 0 16px mobile, centered desktop

**✅ ФАЗА 3: Проверка**
- [ ] Y: 112px (mobile) / 140px (desktop)
- [ ] Height: 68px (mobile) / 76px (desktop)
- [ ] 4 кнопки в ряд с равными gap
- [ ] Центрирование

⏸️ **CHECKPOINT 9** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 10: Theme Panel (glassmorphism + иконки)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет панели и иконки тем:
- Панель: `assets/ui_components/theme_panel.svg`
- Иконки:
  - `assets/love_theme/love_icon.svg`
  - `assets/star_theme/star_icon.svg`
  - `assets/nature_theme/nature_icon.svg`
  - `assets/night_theme/night_icon.svg`

⏸️ **APPROVAL 10** → Проверка ассетов

**🔧 ФАЗА 2: Интеграция**
- Panel background: rgba(255, 255, 255, 0.5)
- backdrop-filter: blur(16px)
- border-radius: 20px mobile, 24px desktop
- Button size: 52×52px mobile, 56×56px desktop
- Icon size: 24px mobile, 28px desktop

**✅ ФАЗА 3: Проверка**
- [ ] Glassmorphism панели виден
- [ ] Кнопки: 52px (mobile) / 56px (desktop)
- [ ] Иконки центрированы в кнопках
- [ ] border-radius: 50% (круглые)

⏸️ **CHECKPOINT 10** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 11: Theme Buttons (фон кнопок)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем стиль кнопок:
- Вариант A: Solid white background
- Вариант B: Subtle gradient background
- Вариант C: Glass effect с inner shadow

Референс: theme buttons из мокапа

⏸️ **APPROVAL 11** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- width/height: 52px mobile, 56px desktop
- border-radius: 50%
- background: rgba(255, 255, 255, 0.8)
- box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

**✅ ФАЗА 3: Проверка**
- [ ] Кнопки круглые
- [ ] Size: 52px (mobile) / 56px (desktop)
- [ ] Иконки из шага 10 видны
- [ ] Фон кнопок соответствует мокапу

⏸️ **CHECKPOINT 11** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 12: Theme Buttons (hover + active)
**👤 Роль:** Motion Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем hover/active эффекты:
- Вариант A: Subtle glow
- Вариант B: Strong glow + border
- Вариант C: Как в мокапе

Референс: hover states из мокапа

⏸️ **APPROVAL 12** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- hover: box-shadow с glow (НЕ scale!)
- active: border: 2px solid var(--primary)
- transition: all 0.3s ease

**✅ ФАЗА 3: Проверка**
- [ ] При hover появляется glow
- [ ] Активная кнопка имеет цветную рамку
- [ ] Нет обрезания эффектов
- [ ] Transition плавный

⏸️ **CHECKPOINT 12** → Скриншот + Видео hover → Одобрение

---

### ШАГ 13: Game Status
**👤 Роль:** UX Specialist + UI Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем pill-shaped status:
- Вариант A: Minimal pill
- Вариант B: Pill с subtle glow
- Вариант C: Как в мокапе

Референс: Game Status из мокапа

⏸️ **APPROVAL 13** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- Pill-shape glassmorphism контейнер
- height: 44px mobile, 52px desktop
- padding: 0 24px mobile, 0 28px desktop
- border-radius: 16px mobile, 20px desktop

**✅ ФАЗА 3: Проверка**
- [ ] Y: 492px (mobile) / 676px (desktop)
- [ ] Height: 44px (mobile) / 52px (desktop)
- [ ] margin-top: 16px (mobile) / 20px (desktop)
- [ ] Glassmorphism эффект виден

⏸️ **CHECKPOINT 13** → Скриншот Mobile + Desktop → Одобрение

---

### ШАГ 14: Игровые символы (X/O)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовые Ultra-HD символы для каждой темы:
- **Love:** `symbol_x_heart.svg`, `symbol_o_star.svg`
- **Star:** `symbol_x_star.svg`, `symbol_o_sparkle.svg`
- **Nature:** `symbol_x_clover.svg`, `symbol_o_leaf.svg`
- **Night:** `symbol_x_moon.svg`, `symbol_o_star.svg`

⏸️ **APPROVAL 14** → Проверка символов

**🔧 ФАЗА 2: Интеграция**
- Size: clamp(2rem, 8vw, 3rem) mobile
- Size: clamp(2.5rem, 6vw, 4rem) desktop
- Центрирование в ячейке: display: flex, align-items: center, justify-content: center

**✅ ФАЗА 3: Проверка**
- [ ] Символы центрированы
- [ ] Size пропорционален ячейке
- [ ] Все 4 темы имеют символы
- [ ] Символы соответствуют мокапу

⏸️ **CHECKPOINT 14** → Скриншот всех тем → Одобрение

---

### ШАГ 15: Hover эффект на ячейках
**👤 Роль:** Motion Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем hover effect:
- Вариант A: Subtle scale(1.02)
- Вариант B: Background brighten
- Вариант C: Scale + glow

Референс: cell hover из мокапа

⏸️ **APPROVAL 15** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- hover: scale(1.02), background усиление
- transition: all 0.2s ease
- cursor: pointer на пустых

**✅ ФАЗА 3: Проверка**
- [ ] Hover только на пустых ячейках
- [ ] Плавная анимация
- [ ] Нет дёргания

⏸️ **CHECKPOINT 15** → Видео hover → Одобрение

---

### ШАГ 16: Win Modal (overlay + card)
**👤 Роль:** Frontend Architect + UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовый ассет карточки модального окна:
- `assets/ui_components/modal_card.svg`

⏸️ **APPROVAL 16** → Проверка ассета

**🔧 ФАЗА 2: Интеграция**
- Overlay: background rgba(0,0,0,0.4), backdrop-filter blur(8px)
- Card: width min(90vw, 380px)
- border-radius: 28px
- padding: 32px 24px
- overflow: hidden

**✅ ФАЗА 3: Проверка**
- [ ] Modal центрирован
- [ ] Overlay размывает фон
- [ ] Card размеры соответствуют
- [ ] overflow: hidden работает

⏸️ **CHECKPOINT 16** → Скриншот → Одобрение

---

### ШАГ 17: Win Modal (иконки и контент)
**👤 Роль:** UI Designer + UX Specialist

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовые иконки для контента:
- `assets/ui_icons/celebration.svg` (Хлопушка)
- `assets/ui_icons/copy.svg` (Копировать)
- `assets/ui_icons/telegram.svg` (Телеграм)

⏸️ **APPROVAL 17** → Проверка иконок

**🔧 ФАЗА 2: Интеграция**
- Celebration icon: 56px
- Title: 28px, gradient text
- Promo-box: dashed border, 24px font
- Buttons: Copy + Telegram (48px height)
- Primary button: 52px height, shimmer

**✅ ФАЗА 3: Проверка**
- [ ] Все элементы внутри card
- [ ] Нет overflow
- [ ] Иконки соответствуют выбранным
- [ ] Buttons правильного размера

⏸️ **CHECKPOINT 17** → Скриншот → Одобрение

---

### ШАГ 18: Lose + Draw Modals
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем готовые иконки для других модалок:
- **Lose:** `assets/ui_icons/muscle.svg`
- **Draw:** `assets/ui_icons/handshake.svg`

⏸️ **APPROVAL 18** → Проверка иконок

**🔧 ФАЗА 2: Интеграция**
- LoseModal: icon + "Не расстраивайтесь!"
- DrawModal: icon + "Ничья!"
- Только primary button
- Стиль идентичен Win Modal

**✅ ФАЗА 3: Проверка**
- [ ] Стиль идентичен Win Modal
- [ ] Иконки соответствуют выбранным
- [ ] Только primary button
- [ ] Нет overflow

⏸️ **CHECKPOINT 18** → Скриншот обоих modals → Одобрение

---

### ШАГ 19: Анимации модалок
**👤 Роль:** Motion Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем анимации (записываем видео):
- Вариант A: Быстрый fade+scale
- Вариант B: Медленный elegant slide
- Вариант C: Bounce как в мокапе

Референс: modal animations из мокапа

⏸️ **APPROVAL 19** → Выбор анимации

**🔧 ФАЗА 2: Интеграция**
- fadeIn для overlay: 0.3s
- slideIn для card: scale(0.9→1) + translateY
- bounce для icon: 0.5s

**✅ ФАЗА 3: Проверка**
- [ ] Плавное появление
- [ ] Нет рывков
- [ ] Icon bounce работает

⏸️ **CHECKPOINT 19** → Видео анимации → Одобрение

---

### ШАГ 20: Shimmer на кнопках
**👤 Роль:** Motion Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем shimmer эффект:
- Вариант A: Быстрый shimmer (2s)
- Вариант B: Медленный (4s)
- Вариант C: Как в мокапе (3s)

Референс: button shimmer из мокапа

⏸️ **APPROVAL 20** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- ::before с linear-gradient
- animation: shimmer 3s infinite
- overflow: hidden на button

**✅ ФАЗА 3: Проверка**
- [ ] Блик бегает по кнопке
- [ ] overflow: hidden не обрезает button content
- [ ] Скорость соответствует выбору

⏸️ **CHECKPOINT 20** → Видео shimmer → Одобрение

---

### ШАГ 21: Win pulse + Confetti
**👤 Роль:** Motion Designer

**🎨 ФАЗА 1: Генерация (3 варианта)**
Генерируем win celebration:
- Вариант A: Minimal pulse
- Вариант B: Strong pulse + много confetti
- Вариант C: Как в мокапе

Референс: win celebration из мокапа

⏸️ **APPROVAL 21** → Выбор варианта

**🔧 ФАЗА 2: Интеграция**
- Winning cells: animation winPulse
- canvas-confetti: 100 particles
- Colors: theme-based

**✅ ФАЗА 3: Проверка**
- [ ] Победные ячейки пульсируют
- [ ] Confetti летит
- [ ] Цвета confetti соответствуют теме

⏸️ **CHECKPOINT 21** → Видео победы → Одобрение

---

### ШАГ 22: Все 4 темы (цвета + backgrounds)
**👤 Роль:** UI Designer

**🎨 ФАЗА 1: Подготовка ассетов**
Используем CSS градиенты и текстуру шума:
- `assets/ui_components/noise_texture.svg`
- CSS Variables для цветов (см. раздел Цветовые схемы)

⏸️ **APPROVAL 22** → Проверка цветов и текстуры

**🔧 ФАЗА 2: Интеграция**
- CSS переменные для каждой темы
- data-theme attribute switching
- Background gradient mesh для каждой

**✅ ФАЗА 3: Проверка**
- [ ] Love (розовый) ✓
- [ ] Star (золотой) ✓
- [ ] Nature (зелёный) ✓
- [ ] Night (фиолетовый) ✓
- [ ] Переключение работает

⏸️ **CHECKPOINT 22** → Скриншоты всех 4 тем → Одобрение

---

### ШАГ 23: Финальная проверка
**👤 Роль:** QA Visual

**Полный pixel-perfect тест:**

**Mobile 375×812:**
- [ ] Header: Y=16, H=48, W=343
- [ ] Promo: Y=76, font=16px
- [ ] Theme Panel: Y=112, H=68
- [ ] Board: Y=196, 280×280
- [ ] Status: Y=492, H=44

**Desktop 1440×900:**
- [ ] Header: Y=24, H=56, W=1392
- [ ] Promo: Y=96, font=20px
- [ ] Theme Panel: Y=140, H=76
- [ ] Board: Y=236, 420×420
- [ ] Status: Y=676, H=52

**Функциональность:**
- [ ] Все hover/active состояния
- [ ] Все 3 модалки без overflow
- [ ] Все 4 темы работают
- [ ] Все анимации плавные
- [ ] Все иконки соответствуют выбранным

⏸️ **FINAL CHECKPOINT** → Полный тест → Завершение
