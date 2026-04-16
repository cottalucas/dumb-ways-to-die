# Design System

## Philosophy
Senior-first, warm, trustworthy. Calm confidence of a good physiotherapist's office. Not fitness-bro, not clinical.

## Colors
### Primary
- Teal: #1A8A7D (buttons, active, progress)
- Teal Dark: #14706A (hover/pressed)
- Teal Light: #E6F5F3 (backgrounds)

### Neutrals
- Text Primary: #1E293B
- Text Secondary: #64748B
- Text Muted: #94A3B8
- Background: #FAFAF8 (warm off-white)
- Card: #FFFFFF
- Border: #E8E5E0
- Divider: #F1EDE8

### Accents
- Orange (celebration): #E8913A
- Red (warning): #DC4F4F
- Green (success): #3BA676

### AI
- AI bubble: #F5F0EB
- User bubble: #1A8A7D (white text)

## Typography
- Headings: Source Serif 4
- Body/UI: DM Sans
- Never Inter, Roboto, Arial

| Element | Font | Size | Weight |
|---|---|---|---|
| Page title | Serif | 28px | 600 |
| Section | Serif | 22px | 600 |
| Card title | Sans | 18px | 600 |
| Body | Sans | 16px | 400 |
| Caption | Sans | 14px | 400 |
| Button | Sans | 16px | 600 |
| Hero number | Serif | 48px | 700 |

Minimum: 14px everywhere.

## Spacing
Base 4px. Card padding 20px. Screen padding 20px. Tab bar 72px tall.

## Radius
- Buttons: 12px
- Cards: 16px
- Chat bubbles: 16px (4px corner near sender)
- Pills: 999px

## Shadows
- Card: 0 1px 3px rgba(30,41,59,0.06), 0 1px 2px rgba(30,41,59,0.04)
- Elevated: 0 4px 12px rgba(30,41,59,0.08)
- Tab bar: 0 -1px 4px rgba(30,41,59,0.06)

## Components
**Buttons:** Primary (teal bg/white text/56px/12px radius), Secondary (teal outline), Ghost (teal text), Destructive (red text)

**Cards:** White bg, 1px #E8E5E0 border, 16px radius, 20px padding, card shadow. Never nest.

**Tab bar:** White bg, 72px tall, border top, 4 tabs. Active=teal, inactive=muted. 20px safe-area bottom.

**Chat bubbles:** AI left #F5F0EB, user right teal white. Max 80% width.

## Icons
Lucide React. 24px tab bar, 20px cards/buttons, 16px inline.
Key: Home, Dumbbell, TrendingUp, User, Play, Pause, Check, Clock, ChevronRight, ArrowLeft, MessageCircle, Smartphone, Award.

## Motion
- 250ms ease-out
- Card entrance: fade + translateY(8px), stagger 50ms
- Button press: scale 0.97
- Pulse (today): scale 1→1.05, infinite, 2s
- Respect prefers-reduced-motion
- Never: bounce, shake, spin

## Accessibility
- WCAG AA (4.5:1 body, 3:1 large)
- Tap targets 48x48px, 8px between
- No color-only info
- Focus: 2px teal outline, 2px offset
- No autoplay
- Min 14px text
- Alt text on images
- Visible input labels
