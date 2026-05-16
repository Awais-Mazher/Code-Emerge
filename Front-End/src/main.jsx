import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import WebContextProvider from '../context/WebContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WebContextProvider>
      <App />
    </WebContextProvider>
  </BrowserRouter>
)
