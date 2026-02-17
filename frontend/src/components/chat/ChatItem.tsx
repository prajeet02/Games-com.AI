import { Avatar, Box, Typography } from '@mui/material'
import { useAuth } from '../../context/AuthContext'

function ChatItem({ content, role }: { content: string, role: "user" | "assistant" }) {
  const auth = useAuth()
  const isBot = role === "assistant";

  return (
    <Box sx={{
      display: "flex", p: 1.75, mb: 1.2, gap: 2, borderRadius: 1.5,
      bgcolor: isBot ? "rgba(0,255,135,0.04)" : "rgba(0,212,255,0.04)",
      border: "1px solid",
      borderColor: isBot ? "rgba(0,255,135,0.10)" : "rgba(0,212,255,0.10)",
      borderLeft: isBot ? "3px solid rgba(0,255,135,0.35)" : "3px solid rgba(0,212,255,0.35)",
    }}>
      <Avatar sx={{
        width: 36, height: 36, fontSize: 13,
        fontFamily: "'Orbitron',sans-serif", fontWeight: 700,
        bgcolor: isBot ? "var(--neon-dim)" : "var(--cyan-dim)",
        color: isBot ? "var(--neon)" : "var(--cyan)",
        border: `1px solid ${isBot ? "rgba(0,255,135,0.25)" : "rgba(0,212,255,0.25)"}`,
      }}>
        {isBot ? "AI" : (auth?.user?.name?.[0]?.toUpperCase() ?? "U")}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 10, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: isBot ? "var(--neon)" : "var(--cyan)", opacity: 0.6, mb: 0.4 }}>
          {isBot ? "Gaming AI" : (auth?.user?.name ?? "Player")}
        </Typography>
        <Typography sx={{ fontSize: 15, lineHeight: 1.65, color: "var(--text)", whiteSpace: "pre-wrap", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>
          {content}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChatItem