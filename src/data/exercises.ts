export interface Exercise {
  id: string
  name: string
  description: string
  instructions: [string, string, string]
  duration: number | null
  reps: number | null
  sets: number
  difficulty: 1 | 2 | 3
  muscleGroup: string
  safetyTip: string
}

export const exercises: Exercise[] = [
  {
    id: 'heel-raises',
    name: 'Heel Raises',
    description: 'A gentle strengthening exercise that builds calf and ankle stability — key for walking confidently on uneven ground.',
    instructions: [
      'Stand behind a sturdy chair, holding the back lightly for support. Keep feet hip-width apart.',
      'Slowly rise onto the balls of your feet, lifting your heels as high as comfortable. Hold for one second at the top.',
      'Lower back down with control. Move slowly — the downward phase is just as important as the lift.',
    ],
    duration: null,
    reps: 10,
    sets: 2,
    difficulty: 1,
    muscleGroup: 'Calves & ankles',
    safetyTip: 'Keep a light grip on the chair — it\'s there for balance, not to take your weight. If you feel any ankle pain, reduce your range of motion.',
  },
  {
    id: 'sit-to-stand',
    name: 'Sit-to-Stand',
    description: 'One of the most practical exercises you can do — it directly trains the movement you use dozens of times each day.',
    instructions: [
      'Sit near the front edge of a sturdy, armless chair with feet flat on the floor, hip-width apart.',
      'Lean slightly forward and push through your heels to stand upright. Avoid using your hands if possible.',
      'Pause at the top, then slowly lower yourself back to sitting, controlling the descent.',
    ],
    duration: null,
    reps: 10,
    sets: 2,
    difficulty: 1,
    muscleGroup: 'Quadriceps & glutes',
    safetyTip: 'Choose a chair that won\'t slide. If standing without hands feels difficult today, use your hands — building strength takes time.',
  },
  {
    id: 'heel-to-toe-walk',
    name: 'Heel-to-Toe Walk',
    description: 'A balance and coordination exercise that mimics walking on a tightrope — training the precise balance needed for confident movement.',
    instructions: [
      'Stand near a wall or countertop you can reach if needed. Focus your gaze on a fixed point ahead.',
      'Place one foot directly in front of the other so the heel of the front foot just touches the toes of the back foot.',
      'Take 5 slow, deliberate steps forward, then turn carefully and return. Keep your arms slightly out to the sides.',
    ],
    duration: null,
    reps: 5,
    sets: 2,
    difficulty: 2,
    muscleGroup: 'Balance & coordination',
    safetyTip: 'Walk alongside a wall so you can touch it anytime. This exercise challenges your balance intentionally — some wobbling is normal and expected.',
  },
  {
    id: 'single-leg-stand',
    name: 'Single Leg Stand',
    description: 'A deceptively simple hold that builds the deep stabilizing muscles essential for walking, stepping over obstacles, and climbing stairs.',
    instructions: [
      'Stand near a wall or chair back. Shift your weight onto one foot, then slowly lift the other foot a few centimetres off the floor.',
      'Hold the position for up to 15 seconds, breathing normally. Keep your standing knee slightly soft, not locked.',
      'Lower your foot gently and repeat on the other side. Over time, try reducing your grip on the support.',
    ],
    duration: 15,
    reps: null,
    sets: 3,
    difficulty: 2,
    muscleGroup: 'Core & balance',
    safetyTip: 'Always keep one hand within reach of support. If you feel a wobble, that\'s your muscles working — just touch the wall lightly and continue.',
  },
  {
    id: 'side-steps',
    name: 'Side Steps',
    description: 'Lateral movement strengthens the hip muscles on the outside of your leg, which play a crucial role in preventing stumbles when stepping sideways.',
    instructions: [
      'Stand with feet together, holding a wall or countertop lightly. Keep your back tall and eyes forward.',
      'Step sideways with one foot, then bring the other foot to meet it. Take 10 steps in one direction.',
      'Pause, then return with 10 steps in the other direction. Maintain an even, deliberate pace throughout.',
    ],
    duration: null,
    reps: 10,
    sets: 2,
    difficulty: 2,
    muscleGroup: 'Hip abductors',
    safetyTip: 'Clear the path before starting — make sure there is nothing to trip over in your stepping zone. Move at whatever pace feels controlled.',
  },
  {
    id: 'seated-knee-extension',
    name: 'Seated Knee Extension',
    description: 'A seated exercise that builds quadriceps strength — the front thigh muscles that absorb impact with every step you take.',
    instructions: [
      'Sit upright in a sturdy chair with your back against the backrest and feet flat on the floor.',
      'Slowly straighten one leg, extending the knee fully until the leg is parallel to the floor. Hold for two seconds.',
      'Lower the foot back down with control. Complete all reps on one side before switching legs.',
    ],
    duration: null,
    reps: 10,
    sets: 2,
    difficulty: 1,
    muscleGroup: 'Quadriceps',
    safetyTip: 'Stop if you feel sharp pain in your knee joint. Some muscle fatigue in the front of your thigh is normal and a sign the exercise is working.',
  },
]

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id)
}
