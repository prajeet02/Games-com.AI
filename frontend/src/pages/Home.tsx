import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const auth = useAuth();
  const startPath = auth?.isLoggedIn ? "/chat" : "/login"

  return (
    <Box className="scanlines" sx={{
      minHeight: "100dvh", position: "relative", overflow: "hidden", bgcolor: "var(--bg)",
      "&::before": {
        content: '""', position: "absolute", inset: -200,
        background:
          "radial-gradient(ellipse at 18% 32%, rgba(0,255,135,0.16), transparent 52%)," +
          "radial-gradient(ellipse at 78% 22%, rgba(0,212,255,0.13), transparent 50%)," +
          "radial-gradient(ellipse at 50% 82%, rgba(139,92,246,0.10), transparent 55%)," +
          "radial-gradient(ellipse at 88% 68%, rgba(255,0,128,0.07), transparent 42%)",
        filter: "blur(80px)",
      },
      "&::after": {
        content: '""', position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
        backgroundImage:
          "repeating-linear-gradient(0deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)," +
          "repeating-linear-gradient(90deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)",
      },
    }}>
      {/* HUD corners */}
      <Box sx={{ position: "absolute", top: 90, left: 32, width: 36, height: 36, borderTop: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)", opacity: 0.3, zIndex: 5 }} />
      <Box sx={{ position: "absolute", top: 90, right: 32, width: 36, height: 36, borderTop: "2px solid var(--neon)", borderRight: "2px solid var(--neon)", opacity: 0.3, zIndex: 5 }} />
      <Box sx={{ position: "absolute", bottom: 32, left: 32, width: 36, height: 36, borderBottom: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)", opacity: 0.3, zIndex: 5 }} />
      <Box sx={{ position: "absolute", bottom: 32, right: 32, width: 36, height: 36, borderBottom: "2px solid var(--neon)", borderRight: "2px solid var(--neon)", opacity: 0.3, zIndex: 5 }} />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100dvh", textAlign: "center", px: 3 }}>
        {/* Status badge */}
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.5, py: 0.7, mb: 4, border: "1px solid var(--neon)", borderRadius: 1, bgcolor: "var(--neon-dim)", boxShadow: "var(--neon-glow)" }}>
          <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "var(--neon)", boxShadow: "0 0 8px var(--neon)" }} />
          <Typography sx={{ fontSize: 12, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, color: "var(--neon)", letterSpacing: 2.5, textTransform: "uppercase" }}>
            System Online
          </Typography>
        </Box>

        {/* Headline */}
        <Typography sx={{
          fontSize: { xs: 52, sm: 80, md: 120 }, fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
          lineHeight: 1, letterSpacing: { xs: 2, md: 8 }, textTransform: "uppercase",
          background: "linear-gradient(135deg, #00FF87 0%, #00D4FF 50%, #8B5CF6 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(0,255,135,0.25))",
        }}>
          LEVEL UP
        </Typography>
        <Typography sx={{
          fontSize: { xs: 52, sm: 80, md: 120 }, fontFamily: "'Orbitron',sans-serif", fontWeight: 900,
          lineHeight: 1, letterSpacing: { xs: 2, md: 8 }, textTransform: "uppercase",
          color: "var(--text)", textShadow: "0 0 60px rgba(0,255,135,0.12)",
        }}>
          YOUR GAME
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ mt: 3, maxWidth: 620, fontSize: { xs: 17, md: 21 }, fontFamily: "'Rajdhani',sans-serif", fontWeight: 400, color: "var(--text-muted)", lineHeight: 1.7, letterSpacing: 0.5 }}>
          Your AI-powered gaming companion. Walkthroughs, pro tips, lore breakdowns, hardware advice&nbsp;— all in one place.
        </Typography>

        {/* CTA */}
        <Button component={Link} to={startPath} sx={{
          mt: 5, px: 5, py: 1.5, fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 15,
          letterSpacing: 3, textTransform: "uppercase", color: "#0A0A0F", bgcolor: "var(--neon)",
          borderRadius: 1, border: "1px solid var(--neon)", boxShadow: "var(--neon-glow), inset 0 1px 0 rgba(255,255,255,0.18)",
          ":hover": { bgcolor: "#00cc6a", boxShadow: "0 0 20px rgba(0,255,135,0.6), 0 0 50px rgba(0,255,135,0.25)" },
        }}>
          Start Playing →
        </Button>

        {/* Bottom tag */}
        <Box sx={{ mt: 6, display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ width: 50, height: "1px", bgcolor: "var(--neon)", opacity: 0.25 }} />
          <Typography sx={{ fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, color: "var(--neon)", letterSpacing: 3, textTransform: "uppercase", opacity: 0.45 }}>
            Powered by Gemini AI
          </Typography>
          <Box sx={{ width: 50, height: "1px", bgcolor: "var(--neon)", opacity: 0.25 }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home;