import { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "./styles/global"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room"
import { AdminRoom } from "./pages/AdminRoom"

import { AuthContextProvider } from "./contexts/AuthContext"
import { ToggleContext, ToggleProvider } from "./contexts/toogleContext"

function App() {
  const { theme } = useContext(ToggleContext)

  console.log(theme)

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <ToggleProvider>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" exact component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </ToggleProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App
