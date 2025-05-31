"use client";

import { ToastProvider } from "@/ui/toast";
import { useTheme } from "app/Hooks/useContext";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <body
      className={`antialiased ${theme === "White" ? "bg-white" : "bg-black"}`}
    >
      <ToastProvider>{children}</ToastProvider>
    </body>
  );
}
