/* eslint-disable react/prop-types */
import { createContext,  useEffect,  useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => {},
});


export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
      if (theme === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>{props.children}</ThemeContext.Provider>
  )
 
}
