import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = "https://games-com-ai-backend.onrender.com/api/v1";
axios.defaults.withCredentials = true;

const theme  = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00FF87" },
    secondary: { main: "#00D4FF" },
    background: {
      default: "#0A0A0F",
      paper: "#111118",
    },
    text: {
      primary: "#E2E2E2",
      secondary: "rgba(226,226,226,0.55)",
    },
  },
  typography:{
    fontFamily: "'Rajdhani', sans-serif",
    allVariants:{ color: "#E2E2E2" },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
    <Toaster position='top-right'/>
    <App />
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
