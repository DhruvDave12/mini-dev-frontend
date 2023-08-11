"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(
    typeof window != "undefined"
      ? localStorage.getItem("theme") === "dark"
      : undefined
  );

  useEffect(() => {
    if (mounted === undefined) {
      setTheme("light");
      if (typeof window != "undefined") {
        localStorage.setItem("theme", "light");
      }
    } else {
      if (mounted) {
        setTheme("dark");
        if (typeof window != "undefined") {
          localStorage.setItem("theme", "dark");
        }
      } else {
        setTheme("light");
        if (typeof window != "undefined") {
          localStorage.setItem("theme", "light");
        }
      }
    }
  }, [mounted, setTheme, typeof window]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setMounted((prevMounted) => !prevMounted);
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
