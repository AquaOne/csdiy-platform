"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProgressState {
  // lessonId -> completed
  completedLessons: Record<string, boolean>
  // lessonId -> score
  quizScores: Record<string, number>
  // Set a lesson as completed
  completeLesson: (lessonId: string) => void
  // Record quiz score
  setQuizScore: (lessonId: string, score: number) => void
  // Check if a lesson is completed
  isCompleted: (lessonId: string) => boolean
  // Get completion count for a course
  getCourseProgress: (lessonIds: string[]) => number
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      quizScores: {},
      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: { ...state.completedLessons, [lessonId]: true },
        })),
      setQuizScore: (lessonId, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [lessonId]: score },
        })),
      isCompleted: (lessonId) => get().completedLessons[lessonId] === true,
      getCourseProgress: (lessonIds) =>
        lessonIds.filter((id) => get().completedLessons[id] === true).length,
    }),
    { name: "csdiy-progress" }
  )
)
