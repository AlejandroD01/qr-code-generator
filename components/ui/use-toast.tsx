"use client"

import React, { useState, useCallback } from "react"
import { JSX } from "react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  id?: number
}

type ToastFunction = (props: ToastProps) => void

export function useToast(): { toast: ToastFunction; Toaster: () => JSX.Element } {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast: ToastFunction = useCallback((props: ToastProps) => {
    setToasts((prev) => [...prev, { ...props, id: Date.now() }])

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== props.id))
    }, 3000)
  }, [])

  const Toaster = () => (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`mb-2 p-4 rounded-md shadow-md ${
            t.variant === "destructive" ? "bg-red-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          {t.title && <h3 className="font-bold">{t.title}</h3>}
          {t.description && <p>{t.description}</p>}
        </div>
      ))}
    </div>
  )

  return { toast, Toaster }
}

