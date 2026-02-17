import { AppBar, Box, Toolbar } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink';
import { useAuth } from '../context/AuthContext';

function Header() {
  const auth = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === "/";
  const isChat = pathname === "/chat";
  const isOverlay = isHome || isChat;
  const startPath = auth?.isLoggedIn ? "/chat" : "/login";

  return (
    <AppBar
      position={isOverlay ? "fixed" : "sticky"}
      sx={{
        top: isOverlay ? 12 : 8,
        ...(isOverlay
          ? {
              left: { xs: 12, md: 20 },
              right: { xs: 12, md: 20 },
              width: "auto",
              bgcolor: "rgba(10,10,15,0.55)",
              border: "1px solid rgba(0,255,135,0.12)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 0 20px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,255,135,0.02)",
              borderRadius: 2,
            }
          : {
              mx: { xs: 1, md: 2 },
              width:"auto",
              bgcolor: "rgba(10,10,15,0.75)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              borderRadius: 2,
            }),
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2, minHeight: 60 }}>
        <Logo />

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center", mx: "auto" }}>
          <NavigationLink to="/" text="Home" kind="text" />
          {auth?.isLoggedIn ? (
            <NavigationLink to="/chat" text="Chat" kind="text" />
          ) : (
            <>
              <NavigationLink to="/login" text="Login" kind="text" />
              <NavigationLink to="/signup" text="Signup" kind="text" />
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {auth?.isLoggedIn ? (
            <NavigationLink to="/login" text="Logout" kind="cta" onClick={auth.logout} />
          ) : (
            <NavigationLink to={startPath} text="Play Now" kind="cta" />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header