"use client";
import { Button } from "@/ui/button";
import { useToast } from "@/ui/toast";
import { useTheme } from "./Hooks/useContext";
export default function Home() {
  const toast = useToast();
  const theme = useTheme();
  return (
    <div className="flex flex-col items-start gap-2 p-4">
      <Button
        className="cursor-pointer "
        text="DONE"
        onClick={() => toast.success("DONE")}
      />
      <Button
        className="cursor-pointer"
        text="ERROR"
        onClick={() => toast.error("ERROR")}
      />
      <Button
        className="cursor-pointer"
        text="INFO"
        onClick={() => toast.info("INFO")}
      />
      <Button
        className="cursor-pointer"
        text="WARN"
        onClick={() => toast.warn("WARN")}
      />
      <Button
        className={`cursor-pointer ${
          theme.theme === "White" ? "bg-black" : "bg-white"
        }`}
        text="Change theme"
        onClick={() => theme.toggleTheme()}
      />
    </div>
  );
}
