# Data Mocks

All data hardcoded in `src/data/`. No API calls.

## User default
```json
{
  "name": "Margaret",
  "balanceConfidence": 3,
  "hasFallenLastYear": false,
  "totalSessions": 12,
  "currentStreak": 3
}
```

## 6 Exercises
1. **Heel Raises** — reps 10, sets 2, difficulty 1, "Calves & ankles". Strengthen calves and ankle stability by slowly rising onto toes.
2. **Sit-to-Stand** — reps 10, sets 2, difficulty 1, "Quadriceps & glutes". Build leg strength for getting up from chairs.
3. **Heel-to-Toe Walk** — reps 5, sets 2, difficulty 2, "Balance & coordination". Walk in straight line, heel touching toes.
4. **Single Leg Stand** — duration 15s, sets 3, difficulty 2, "Core & balance". Stand on one foot near support.
5. **Side Steps** — reps 10, sets 2, difficulty 2, "Hip abductors". Strengthen hips for lateral stability.
6. **Seated Knee Extension** — reps 10, sets 2, difficulty 1, "Quadriceps". Strengthen quads while seated.

Each exercise has: id, name, description, instructions (3 bullets), reps OR duration, sets, difficulty (1-3), muscleGroup, safetyTip.

## 3 Session templates
- **Balance Builder** (focus: balance): heel-to-toe-walk, single-leg-stand, side-steps, heel-raises. 12 min, diff 2.
- **Strength & Stability** (focus: strength): sit-to-stand, heel-raises, seated-knee-extension, single-leg-stand. 14 min, diff 1.
- **Gentle Movement** (focus: low intensity): seated-knee-extension, heel-raises, sit-to-stand. 10 min, diff 1.

Default today's session: Balance Builder.

## Weekly progress (4 weeks)
- Week 1: 2 sessions, 22 min, score 58, activity [F,T,F,F,T,F,F]
- Week 2: 3 sessions, 35 min, score 63, [T,F,T,F,F,T,F]
- Week 3: 4 sessions, 48 min, score 68, [T,T,F,T,F,T,F]
- Week 4: 3 sessions, 38 min, score 72, [T,F,T,T,F,F,F]

## Balance check history
- 2026-03-20: sway 62
- 2026-03-30: sway 67
- 2026-04-10: sway 74

## AI messages

### Greetings
- firstDay: "Welcome! I've prepared a gentle starter session. Ready when you are."
- streak: "That's {streak} days in a row, {name}. Your consistency is building real strength. Today let's work on {focus}."
- afterBreak: "Good to see you back, {name}. No pressure — let's start with something light today."

### Chat responses
- **"How am I doing?"** → "You've completed 12 sessions over 4 weeks. Balance score improved 58→72, a 24% increase. The exercises are working. Keep going."
- **"I feel unsteady today"** → "Thank you for telling me. Let's adjust — I'll swap in seated exercises and reduce hold times. Safety first. Shorten the session too?" [Yes, shorter / Keep full]
- **"Make it easier"** → "Of course. I'll reduce difficulty for the next few sessions. We can step it back up when you're ready. No rush."
- **"Tell me about today's exercises"** → "Today's session focuses on {focus}. You'll do {list}. Gentle, at your pace. I'll guide you through each."
- **"Why does this matter?"** → "Balance and strength change with age, but exercise can slow and reverse that. Programs like this reduce fall risk up to 35%. Every session is an investment in your independence."
- **"Something hurts"** → "Please stop the exercise immediately. Mild muscle soreness is normal, but sharp pain or dizziness is not. If pain persists, speak with your doctor." [I'll rest / Mild soreness]

### Exercise encouragement (random during session)
- "You're doing great — focus on smooth, controlled movements."
- "Slow and steady builds real strength."
- "If you feel unsteady, no shame in holding on. Safety first."
- "Halfway there. You're stronger than you think."
- "Nice work. Take a breath before the next one."
- "Consistency matters most, not perfection."
- "Almost done. Finish strong."

## 8 Milestones
Achieved: first session, 5 sessions, 10 sessions, single-leg 15s hold, 4-week streak.
Not yet: 5 sessions in one week, 20 sessions, balance score 80.
