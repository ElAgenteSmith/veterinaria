import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { rootSlice } from 'api/rootSlice'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApiProvider api={rootSlice}>
    <App />
  </ApiProvider>
)

reportWebVitals()
