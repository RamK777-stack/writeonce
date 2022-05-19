import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

const Toggle = () => {
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedPrefs = window.localStorage.getItem("color-theme");
      if (typeof storedPrefs === "string") {
        return storedPrefs;
      }
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }
    // If you want to use dark theme as the default, return 'dark' instead
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
    window.localStorage.setItem("color-theme", rawTheme);
  };

  if (theme) {
    rawSetTheme(theme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <div className="mt-1 transition duration-500 ease-in-out transform hover:-translate-y-1 rounded-full">
      {theme === "dark" ? (
        <SunIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-6 w-6 mr-5 mt-1 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <MoonIcon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-6 w-6 mr-5 mt-1 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default Toggle;
