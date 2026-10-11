import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

const theme = createTheme({
  typography: {
    fontFamily: '"Outfit", sans-serif',
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);