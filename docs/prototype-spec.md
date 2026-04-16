# Prototype Spec

## Navigation
Bottom tab bar, 4 tabs: Home, Exercises, Progress, Profile. No hamburger menus. Max 2 levels deep. Back button when drilled in.

## Screens

### Onboarding (2 steps)
**Welcome:** SteadyStep logo + Footprints icon. Tagline "Your daily balance companion." Value prop: "10 minutes a day to build strength, improve balance, and stay independent." CTA "Get Started."

**Setup:** Name input. Balance confidence 1-5 emoji scale. "Fallen in past 12 months?" Yes/No buttons. CTA "Start My Program" (disabled until all answered).

### Home
1. Greeting: "Good morning, {name} 👋" + date
2. AI card: avatar + contextual message + "Chat with me →" link
3. Today's Session card (hero): session name, 12 min, 4 exercises, difficulty dots, "Start Session" CTA
4. Weekly streak: 7 circles Mon-Sun, filled=completed, pulsing=today
5. Balance Check card (secondary): phone icon, "30-second assessment"

### Exercises
- Today's Session card (condensed)
- Other sessions (2 more templates)
- All exercises list (6 items, tappable)

### Exercise Session (multi-phase)
**Overview:** Session name, duration, exercise list, safety card, "Begin" CTA.

**Active:** "Exercise {n} of {total}" + progress bar. Name. Illustration (CSS-animated). 3 bullet instructions. Timer (circular progress for duration) OR rep counter (tap-to-advance). AI tip card. Pause / Next controls. "Too Easy/Too Hard" ghost buttons.

**Transition:** 2s auto-advance. "Up next: {name}. Take a breath if you need it."

**Complete:** Checkmark animation. "Session Complete." Stats. AI message about streak. "Back to Home" CTA + "View Progress" link.

### Chat
Back arrow + "Your Companion" title. Chat feed seeded with 2 AI messages. Quick-reply chips:
- "How am I doing?"
- "I feel unsteady today"
- "Make it easier"
- "Tell me about today's exercises"
- "Why does this matter?"

Tap chip → user bubble appended → typing indicator 800ms → AI bubble with scripted response from data-mocks. Text input disabled (chips drive conversation).

### Progress
1. Balance Score hero: "72 / 100" huge serif, trend pill "↑ 8%", mini line chart
2. Weekly Activity: bar chart, 4 weeks, current week highlighted
3. Balance Check trends: line chart of sway scores
4. Milestones: list with check/empty icons
5. Recent Sessions: last 5 rows

### Balance Check (3 phases)
**Intro:** Phone icon, "Stand on flat surface, hold phone against chest, 30 seconds." Safety card. "I'm Ready" CTA.

**Measuring:** Concentric pulsing rings. Countdown 30→0. "Hold steady..." Auto-advance on 0.

**Results:** Checkmark. "74 / 100" sway score. Comparison "↑ 6 points." Stability spectrum (red→yellow→green with dot marker). AI message. "Done" CTA.

### Profile
Avatar + name. Editable: name, balance confidence, reminders toggle. About section: "About SteadyStep", "Your Data & Privacy." Danger: "Reset Progress" (red). Version at bottom.

## Interaction notes
- Transitions 200-300ms fade/slide
- Tap targets 48x48px min
- Single-tap only, no swipe-required navigation
- Loading: gentle pulse, never spinner
- Errors: warm, helpful copy
