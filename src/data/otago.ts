export type ExerciseCategory = 'Balance' | 'Kraft' | 'Stabilität'

export interface InstructionStep {
  action: string   // bold top line
  detail: string   // smaller bottom line
}

export interface OtagoExercise {
  id: string
  illustrationId: string  // maps to ExerciseIllustration
  // German
  name: string
  category: ExerciseCategory
  description: string
  instructions: [InstructionStep, InstructionStep, InstructionStep]
  // English
  name_en: string
  category_en: string
  description_en: string
  instructions_en: [InstructionStep, InstructionStep, InstructionStep]
  // Common
  sets: number
  reps?: number
  duration?: number // seconds
}

export const otagoExercises: OtagoExercise[] = [
  {
    id: 'tandem-stand',
    illustrationId: 'heel-to-toe-walk',
    name: 'Tandem-Stand',
    category: 'Balance',
    description: 'Der Tandem-Stand trainiert die statische Balance durch eine enge Fußstellung. Stärkt die Stabilisierungsmuskeln des Sprunggelenks und verbessert die Körperwahrnehmung.',
    instructions: [
      { action: 'Füße positionieren', detail: 'Ferse an Zehe' },
      { action: 'Position halten', detail: 'Ruhig atmen' },
      { action: '3× wiederholen', detail: 'Seite wechseln' },
    ],
    name_en: 'Tandem Stand',
    category_en: 'Balance',
    description_en: 'The tandem stand trains static balance through a narrow foot position. It strengthens the stabilising muscles of the ankle and improves body awareness.',
    instructions_en: [
      { action: 'Position feet', detail: 'Heel to toe' },
      { action: 'Hold position', detail: 'Breathe steadily' },
      { action: 'Repeat 3×', detail: 'Switch sides' },
    ],
    sets: 3,
    duration: 30,
  },
  {
    id: 'einbeinstand',
    illustrationId: 'single-leg-stand',
    name: 'Einbeinstand',
    category: 'Balance',
    description: 'Der Einbeinstand fordert Gleichgewicht und koordinierte Muskelarbeit. Beginnen Sie mit einer Stuhllehne zur Unterstützung und steigern Sie die Dauer schrittweise.',
    instructions: [
      { action: 'Neben Wand stellen', detail: 'Als Sicherheit' },
      { action: 'Knie anheben', detail: 'Blick geradeaus' },
      { action: 'Halten', detail: 'Körper aufrecht' },
    ],
    name_en: 'Single-Leg Stand',
    category_en: 'Balance',
    description_en: 'The single-leg stand challenges balance and coordinated muscle work. Start with a chair back for support and gradually increase the duration.',
    instructions_en: [
      { action: 'Stand near wall', detail: 'For safety' },
      { action: 'Lift one knee', detail: 'Eyes forward' },
      { action: 'Hold steady', detail: 'Body upright' },
    ],
    sets: 3,
    duration: 20,
  },
  {
    id: 'aufstehen-stuhl',
    illustrationId: 'sit-to-stand',
    name: 'Aufstehen vom Stuhl',
    category: 'Kraft',
    description: 'Das Aufstehen vom Stuhl stärkt die Oberschenkel- und Gesäßmuskulatur — entscheidend für sichere Alltagsbewegungen. Reduziert direkt das Sturzrisiko.',
    instructions: [
      { action: 'An Stuhlkante setzen', detail: 'Füße schulterbreit' },
      { action: 'Vorwärts lehnen', detail: 'Gewicht auf Füße' },
      { action: 'Hochdrücken', detail: 'Ohne Arme benutzen' },
    ],
    name_en: 'Sit to Stand',
    category_en: 'Strength',
    description_en: 'Sit-to-stand strengthens the thighs and glutes — essential for safe everyday movements. It directly reduces fall risk.',
    instructions_en: [
      { action: 'Sit at chair edge', detail: 'Feet shoulder-width' },
      { action: 'Lean forward', detail: 'Weight on feet' },
      { action: 'Push up', detail: "Don't use arms" },
    ],
    sets: 3,
    reps: 10,
  },
  {
    id: 'fersen-zehen-gang',
    illustrationId: 'heel-to-toe-walk',
    name: 'Fersen-Zehen-Gang',
    category: 'Stabilität',
    description: 'Der Fersen-Zehen-Gang verbessert die dynamische Balance beim Gehen. Aktiviert die gesamte Beinmuskulatur und schult die Tiefenwahrnehmung.',
    instructions: [
      { action: 'Linie entlanggehen', detail: 'Gerade Linie' },
      { action: 'Ferse vor Zehen', detail: 'Schritt für Schritt' },
      { action: 'Arme ausbreiten', detail: 'Für Balance' },
    ],
    name_en: 'Heel-to-Toe Walk',
    category_en: 'Stability',
    description_en: 'The heel-to-toe walk improves dynamic balance while walking. It activates the entire leg musculature and trains proprioception.',
    instructions_en: [
      { action: 'Walk in a line', detail: 'Straight path' },
      { action: 'Heel before toes', detail: 'Step by step' },
      { action: 'Arms out', detail: 'For balance' },
    ],
    sets: 2,
    reps: 10,
  },
  {
    id: 'kniebeugen',
    illustrationId: 'sit-to-stand',
    name: 'Kniebeugen',
    category: 'Kraft',
    description: 'Kniebeugen stärken Oberschenkel, Gesäß und Wadenmuskulatur. Verbessern die Stabilität beim Aufstehen, Treppensteigen und Gehen.',
    instructions: [
      { action: 'Schulterbreit stehen', detail: 'Zehen leicht außen' },
      { action: 'Knie beugen', detail: 'Oberschenkel parallel' },
      { action: 'Aufstehen', detail: 'Knie über Zehen' },
    ],
    name_en: 'Squats',
    category_en: 'Strength',
    description_en: 'Squats strengthen the thighs, glutes, and calves. They improve stability when standing up, climbing stairs, and walking.',
    instructions_en: [
      { action: 'Stand shoulder-width', detail: 'Toes slightly out' },
      { action: 'Bend knees', detail: 'Thighs parallel' },
      { action: 'Stand back up', detail: 'Knees over toes' },
    ],
    sets: 3,
    reps: 12,
  },
  {
    id: 'wandstuetze',
    illustrationId: 'heel-raises',
    name: 'Wandstütze',
    category: 'Stabilität',
    description: 'Die Wandstütze aktiviert Arm-, Schulter- und Rumpfmuskulatur mit geringem Belastungsrisiko. Fördert die aufrechte Haltung.',
    instructions: [
      { action: 'Armlänge zur Wand', detail: 'Schulterbreit' },
      { action: 'Hände anlegen', detail: 'Schulterhöhe' },
      { action: 'Arme beugen', detail: 'Körper gerade' },
    ],
    name_en: 'Wall Push-Up',
    category_en: 'Stability',
    description_en: 'The wall push-up activates arms, shoulders, and core with low injury risk. It promotes upright posture.',
    instructions_en: [
      { action: 'Arm length from wall', detail: 'Shoulder-width' },
      { action: 'Hands on wall', detail: 'At shoulder height' },
      { action: 'Bend arms', detail: 'Body straight' },
    ],
    sets: 3,
    duration: 20,
  },
  {
    id: 'seitliches-beinheben',
    illustrationId: 'side-steps',
    name: 'Seitliches Beinheben',
    category: 'Balance',
    description: 'Kräftigt die Hüftabduktoren, die für stabiles Gehen und einseitiges Stehen entscheidend sind. Starke Hüftmuskeln reduzieren das Sturzrisiko.',
    instructions: [
      { action: 'Stuhllehne halten', detail: 'Für Halt' },
      { action: 'Bein seitlich heben', detail: 'Knie gestreckt' },
      { action: 'Kontrolliert absenken', detail: 'Nicht aufsetzen' },
    ],
    name_en: 'Side Leg Raise',
    category_en: 'Balance',
    description_en: 'Strengthens the hip abductors, which are essential for stable walking and one-sided standing. Strong hip muscles reduce fall risk significantly.',
    instructions_en: [
      { action: 'Hold chair back', detail: 'For support' },
      { action: 'Lift leg sideways', detail: 'Knee straight' },
      { action: 'Lower slowly', detail: "Don't put foot down" },
    ],
    sets: 3,
    reps: 10,
  },
  {
    id: 'zehenstand',
    illustrationId: 'heel-raises',
    name: 'Zehenstand',
    category: 'Kraft',
    description: 'Der Zehenstand stärkt die Wadenmuskulatur, die beim Gehen als natürlicher Stoßdämpfer wirkt. Kräftige Waden verbessern die Abstoßkraft.',
    instructions: [
      { action: 'Stuhllehne halten', detail: 'Leicht' },
      { action: 'Auf Zehenspitzen heben', detail: 'Langsam' },
      { action: 'Absenken', detail: 'Kontrolliert' },
    ],
    name_en: 'Calf Raise',
    category_en: 'Strength',
    description_en: 'Calf raises strengthen the calf muscles, which act as natural shock absorbers when walking. Strong calves improve push-off power.',
    instructions_en: [
      { action: 'Hold chair lightly', detail: 'For balance' },
      { action: 'Rise onto tiptoes', detail: 'Slowly' },
      { action: 'Lower down', detail: 'With control' },
    ],
    sets: 3,
    reps: 15,
  },
]

export const todaySession = {
  title: { de: 'Balance & Kraft — Tag 4', en: 'Balance & Strength — Day 4' },
  durationMin: 12,
  difficulty: { de: 'Mittel', en: 'Medium' },
  exercises: otagoExercises.slice(0, 6).map(ex => ({ ...ex, done: false })),
}
