"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export enum ToastType {
  SUCCESS,
  FAIL,
  INFO,
  WARN,
}

interface ToastItem {
  id: number;
  message: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
  warn: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (type: ToastType, message: string, description?: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, description, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((e) => e.id !== id));
  };

  const toastContextValue: ToastContextType = {
    success: (message, description) =>
      addToast(ToastType.SUCCESS, message, description),
    error: (message, description) =>
      addToast(ToastType.FAIL, message, description),
    info: (message, description) =>
      addToast(ToastType.INFO, message, description),
    warn: (message, description) =>
      addToast(ToastType.WARN, message, description),
  };

  return (
    <ToastContext.Provider value={toastContextValue}>
      <div className="relative">
        {children}
        <div className="absolute right-5 top-5">
          {toasts.map((e) => (
            <div
              key={e.id}
              className={`p-1.5 m-1.5 flex rounded-md animate-slide-in-right text-white ${
                e.type === ToastType.SUCCESS
                  ? "bg-green-600"
                  : e.type === ToastType.FAIL
                  ? "bg-red-600"
                  : e.type === ToastType.INFO
                  ? "bg-blue-600"
                  : "bg-yellow-500"
              }`}
            >
              <div>
                <div className="font-semibold">{e.message}</div>
                {e.description && (
                  <div className="text-sm">{e.description}</div>
                )}
              </div>
              <div
                className="ml-2 cursor-pointer"
                onClick={() => removeToast(e.id)}
              >
                ✖
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
