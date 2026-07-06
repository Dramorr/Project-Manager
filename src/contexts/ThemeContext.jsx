import { createContext, useEffect } from "react"
import useLocalStorage from "../shared/hooks/useLocalStorage";

const HTML = document.documentElement;

export const ThemeContext = createContext(null);
export function ThemeProvider({children}){
  const {items: theme, setItems: setTheme} = useLocalStorage('theme-mode', 'light');
  useEffect(() => {
    HTML.className = `theme-${theme}`
  }, [theme]);

  const toggleTheme = () => {
    if(theme === 'light') setTheme('dark');
    else setTheme('light');
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}