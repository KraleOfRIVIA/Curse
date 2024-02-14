import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from './store/store.ts'
import {ThemeProvider, createTheme} from "@mui/material";

const store = new Store()
const theme = createTheme({
    palette: {
        primary: {
            main:"#041a38"
        },
        secondary: {
            main: "#2e74c9"
        }
    },
    typography: {
        h1:{
            fontSize:"3rem",
            fontWeight:"600",
        },
        h2:{
            fontSize:"1.75rem",
            fontWeight:"600",
        },
        h3:{
            fontSize:"1.5rem",
            fontWeight:"600",
        },
    }
});
interface State {
    store: Store
}

export const Context = React.createContext<State>({store})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{store}}>
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
  </Context.Provider>
)
