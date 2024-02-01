import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/store.ts'

const store = new Store()

interface State {
    store: Store
}

export const Context = React.createContext<State>({store})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{store}}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Context.Provider>
)
