import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function Logo() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
                <span style={{
                    display: "inline-block",
                    width: 28, height: 28,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #00FF87, #00D4FF)",
                    boxShadow: "0 0 10px rgba(0,255,135,0.35)",
                }} />
            </Link>
            <Typography sx={{
                display: { md: "block", sm: "none", xs: "none" },
                mr: "auto",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--neon)",
                textShadow: "0 0 12px rgba(0,255,135,0.35)",
            }}>
                GAMES-COM.AI
            </Typography>
        </div>
    )
}

export default Logo