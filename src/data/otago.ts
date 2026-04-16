export type ExerciseCategory = 'Balance' | 'Kraft' | 'Stabilität'

export interface OtagoExercise {
  id: string
  name: string
  category: ExerciseCategory
  sets: number
  reps?: number
  duration?: number // seconds
  instructions: [string, string, string]
  description: string
}

export const otagoExercises: OtagoExercise[] = [
  {
    id: 'tandem-stand',
    name: 'Tandem-Stand',
    category: 'Balance',
    sets: 3,
    duration: 30,
    instructions: ['Stellen Sie einen Fuß direkt vor den anderen', 'Halten Sie den Blick auf einen festen Punkt gerichtet', 'Arme seitlich ausgestreckt für mehr Stabilität'],
    description: 'Der Tandem-Stand trainiert die statische Balance durch eine enge Fußstellung. Diese Übung stärkt die kleinen Stabilisierungsmuskeln des Sprunggelenks und verbessert die Körperwahrnehmung.',
  },
  {
    id: 'einbeinstand',
    name: 'Einbeinstand',
    category: 'Balance',
    sets: 3,
    duration: 20,
    instructions: ['Stehen Sie neben einer Wand als Sicherheit', 'Heben Sie ein Knie leicht an', 'Blick gerade aus, Körper aufrecht halten'],
    description: 'Der Einbeinstand fordert Gleichgewicht und koordinierte Muskelarbeit. Beginnen Sie mit einer Stuhllehne zur Unterstützung und steigern Sie die Dauer schrittweise.',
  },
  {
    id: 'aufstehen-stuhl',
    name: 'Aufstehen vom Stuhl',
    category: 'Kraft',
    sets: 3,
    reps: 10,
    instructions: ['Setzen Sie sich an die Stuhlkante', 'Lehnen Sie sich leicht vor, Füße schulterbreit', 'Drücken Sie sich mit den Oberschenkeln hoch — ohne Arme'],
    description: 'Das Aufstehen vom Stuhl stärkt die Oberschenkel- und Gesäßmuskulatur — entscheidend für sichere Alltagsbewegungen. Diese Übung reduziert direkt das Sturzrisiko.',
  },
  {
    id: 'fersen-zehen-gang',
    name: 'Fersen-Zehen-Gang',
    category: 'Stabilität',
    sets: 2,
    reps: 10,
    instructions: ['Gehen Sie in einer geraden Linie', 'Setzen Sie die Ferse direkt vor die Zehen des anderen Fußes', 'Arme seitlich für Balance, Blick nach vorne'],
    description: 'Der Fersen-Zehen-Gang verbessert die dynamische Balance beim Gehen. Er aktiviert die gesamte Beinmuskulatur und schult die Tiefenwahrnehmung für sicheres Bewegen.',
  },
  {
    id: 'kniebeugen',
    name: 'Kniebeugen',
    category: 'Kraft',
    sets: 3,
    reps: 12,
    instructions: ['Stehen Sie schulterbreit, Zehen leicht nach außen', 'Beugen Sie die Knie — Oberschenkel parallel zum Boden', 'Knie über den Zehen halten, Rücken gerade'],
    description: 'Kniebeugen stärken Oberschenkel, Gesäß und Wadenmuskulatur. Sie verbessern die Stabilität beim Aufstehen, Treppensteigen und Gehen auf unebenem Untergrund.',
  },
  {
    id: 'wandstuetze',
    name: 'Wandstütze',
    category: 'Stabilität',
    sets: 3,
    duration: 20,
    instructions: ['Stehen Sie eine Armlänge von der Wand entfernt', 'Hände auf Schulterhöhe an die Wand', 'Beugen Sie die Arme langsam — Körper bleibt gerade'],
    description: 'Die Wandstütze aktiviert Arm-, Schulter- und Rumpfmuskulatur mit geringem Belastungsrisiko. Sie fördert die aufrechte Körperhaltung und stärkt die obere Körperstabilität.',
  },
  {
    id: 'seitliches-beinheben',
    name: 'Seitliches Beinheben',
    category: 'Balance',
    sets: 3,
    reps: 10,
    instructions: ['Halten Sie sich mit einer Hand an der Stuhllehne fest', 'Heben Sie das Bein seitlich langsam an — Knie gestreckt', 'Senken Sie es kontrolliert ab, ohne den Fuß abzusetzen'],
    description: 'Das seitliche Beinheben kräftigt die Hüftabduktoren, die für stabiles Gehen und einseitiges Stehen entscheidend sind. Starke Hüftmuskeln reduzieren das Sturzrisiko erheblich.',
  },
  {
    id: 'zehenstand',
    name: 'Zehenstand',
    category: 'Kraft',
    sets: 3,
    reps: 15,
    instructions: ['Halten Sie sich leicht an einer Stuhllehne fest', 'Heben Sie sich langsam auf die Zehenspitzen', 'Halten Sie kurz, dann langsam absenken'],
    description: 'Der Zehenstand stärkt die Wadenmuskulatur, die beim Gehen und Treppensteigen als natürlicher Stoßdämpfer wirkt. Kräftige Waden verbessern die Abstoßkraft und Schrittstabilität.',
  },
]

// Today's session — first 6 exercises, first one pre-marked as done
export const todaySession = {
  title: 'Balance & Kraft — Tag 4',
  durationMin: 12,
  difficulty: 'Mittel' as const,
  exercises: otagoExercises.slice(0, 6).map((ex, i) => ({ ...ex, done: i === 0 })),
}
