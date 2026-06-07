export interface CategoryWithCourses {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  order: number
  courses: CourseWithProgress[]
}

export interface CourseWithProgress {
  id: string
  title: string
  slug: string
  description: string
  difficulty: string | null
  estimatedHours: number | null
  icon: string | null
  order: number
  categoryId: string
  completedLessons: number
  totalLessons: number
}

export interface LessonWithProgress {
  id: string
  title: string
  slug: string
  order: number
  estimatedMinutes: number | null
  completed: boolean
}

export interface CourseDetail {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string | null
  difficulty: string | null
  estimatedHours: number | null
  icon: string | null
  videoUrl: string | null
  prerequisites: string | null
  category: {
    id: string
    name: string
    slug: string
  }
  lessons: LessonWithProgress[]
}

export interface ProgressData {
  lessonId: string
  completed: boolean
  score: number | null
  completedAt: string | null
}

export interface NoteData {
  lessonId: string
  content: string
}

export interface QuizData {
  id: string
  question: string
  options: string[]
  order: number
}

export interface QuizWithAnswer extends QuizData {
  answer: number
  explanation: string | null
}

export interface UserStats {
  totalCourses: number
  totalLessons: number
  completedLessons: number
  totalQuizzes: number
  correctQuizzes: number
  streakDays: number
  totalNotes: number
}

export interface LearningPathData {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string | null
  courses: string[]
  difficulty: string
  estimatedDays: number | null
  icon: string | null
  color: string | null
}
