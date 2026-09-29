export type TutorProfile = {
  name: string
  subject: string
  about: string
  experience: string
  rating: string
  grades: string
  photo: string
}

export const RADAR_AVATARS = [
  "/search/avatars/tutor-1.png",
  "/search/avatars/tutor-2.png",
  "/search/avatars/tutor-3.png",
  "/search/avatars/tutor-4.png",
  "/search/avatars/tutor-5.png",
  "/search/avatars/tutor-6.png",
  "/search/avatars/tutor-7.png",
  "/search/avatars/tutor-8.png",
  "/search/avatars/tutor-9.png",
  "/search/avatars/tutor-10.png",
] as const

const SEARCH_AVATARS = RADAR_AVATARS

export const SEARCH_TUTORS: TutorProfile[] = [
  {
    name: "Алсу Минталиповна Газизова",
    subject: "Математика",
    about: "Объясняю сложные темы простым языком, люблю разбирать вторую часть ОГЭ.",
    experience: "23 года",
    rating: "5.0",
    grades: "1–4 классы",
    photo: SEARCH_AVATARS[0],
  },
  {
    name: "Игорь П.",
    subject: "Физика",
    about: "Помогаю понять формулы через задачи из сборника, а не заучивание.",
    experience: "8 лет",
    rating: "4,8",
    grades: "8–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[1],
  },
  {
    name: "Света К.",
    subject: "Русский язык",
    about: "Разбираю сжатие, изложение и аргументацию — то, что чаще всего сдают на ОГЭ.",
    experience: "5 лет",
    rating: "4,9",
    grades: "7–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[2],
  },
  {
    name: "Дмитрий В.",
    subject: "Английский",
    about: "Готовлю к письменной части и грамматике, объясняю на понятных примерах.",
    experience: "4 года",
    rating: "4,7",
    grades: "7–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[3],
  },
  {
    name: "Ольга С.",
    subject: "Химия",
    about: "Учу составлять уравнения и считать без паники — шаг за шагом.",
    experience: "7 лет",
    rating: "4,8",
    grades: "8–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[4],
  },
  {
    name: "Алексей Н.",
    subject: "История",
    about: "Связываю даты и события в понятную картину, чтобы легче отвечать на экзамене.",
    experience: "5 лет",
    rating: "4,9",
    grades: "7–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[5],
  },
  {
    name: "Мария Л.",
    subject: "Биология",
    about: "Разбираю задания на анализ и классификацию — то, что часто путает на ОГЭ.",
    experience: "6 лет",
    rating: "4,8",
    grades: "8–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[6],
  },
  {
    name: "Пётр Ж.",
    subject: "Геометрия",
    about: "Показываю логику доказательств и построений, чтобы ребёнок видел ход решения.",
    experience: "9 лет",
    rating: "5,0",
    grades: "8–9 класс, ОГЭ",
    photo: SEARCH_AVATARS[7],
  },
]

/** @deprecated kept for map component */
export type TutorPin = {
  x: number
  y: number
  name: string
  subject: string
}

/** @deprecated kept for map component */
export const TUTOR_PINS: TutorPin[] = [
  { x: 22, y: 24, name: "Анна М.", subject: "Математика" },
  { x: 71, y: 19, name: "Игорь П.", subject: "Физика" },
  { x: 84, y: 50, name: "Света К.", subject: "Русский язык" },
  { x: 30, y: 68, name: "Дмитрий В.", subject: "Английский" },
  { x: 57, y: 78, name: "Ольга С.", subject: "Химия" },
  { x: 13, y: 47, name: "Алексей Н.", subject: "История" },
  { x: 47, y: 33, name: "Мария Л.", subject: "Биология" },
  { x: 76, y: 86, name: "Пётр Ж.", subject: "Геометрия" },
]

export const OGE_SUBJECTS = [
  "Математика",
  "Русский язык",
  "Физика",
  "Химия",
  "Биология",
  "История",
  "Английский",
  "География",
] as const

export type OgeSubject = (typeof OGE_SUBJECTS)[number]

export function findTutorBySubject(subject: string): TutorProfile | undefined {
  return SEARCH_TUTORS.find((tutor) => tutor.subject === subject)
}

export function subjectMatchesPin(subject: string, pinSubject: string) {
  if (subject === pinSubject) return true
  if (subject === "Математика" && pinSubject === "Геометрия") return true
  return false
}
