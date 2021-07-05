import { createContext, ReactNode, useState } from "react"
import dark from "../styles/themes/dark"
import light from "../styles/themes/light"

export const ToggleContext = createContext({
  theme: light,
  toggleTheme: () => {},
  checked: false,
})

type ToggleContextProviderProps = {
  children: ReactNode
}

export function ToggleProvider(props: ToggleContextProviderProps) {
  const [theme, setTheme] = useState(light)
  const [checked, setChecked] = useState(false)
  const { children } = props

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light)
    setChecked(checked === false)
  }

  return (
    <ToggleContext.Provider value={{ theme, toggleTheme, checked }}>
      {children}
    </ToggleContext.Provider>
  )
}
