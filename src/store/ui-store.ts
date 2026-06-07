"use client"

import { create } from "zustand"

interface UIState {
  sidebarOpen: boolean
  rightPanel: "notes" | "quiz" | "code" | null
  theme: "light" | "dark" | "system"
  setSidebarOpen: (open: boolean) => void
  setRightPanel: (panel: "notes" | "quiz" | "code" | null) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  rightPanel: null,
  theme: "system",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setRightPanel: (panel) => set({ rightPanel: panel }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
