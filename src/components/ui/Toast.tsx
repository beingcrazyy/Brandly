"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Check } from "lucide-react";

interface Toast {
  id: number;
  message: string;
}

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-fade-in pointer-events-auto flex items-center gap-2 rounded-full bg-[#14140F] px-4 py-2 text-[13px] font-medium text-white shadow-lg"
          >
            <Check size={14} strokeWidth={2.5} />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
