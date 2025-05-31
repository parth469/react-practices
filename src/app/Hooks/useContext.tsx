"use client";
import ThemeWrapper from "@/ui/theme";
import { createContext, ReactNode, useContext, useState } from "react";

type ThemeType = "Dark" | "White";
interface ThemeInterface {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeInterface | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("White");

  const toggleTheme = () => {
    setTheme((e) => (e === "White" ? "Dark" : "White"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
