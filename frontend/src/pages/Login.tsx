import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { RiLoginBoxLine } from "react-icons/ri";
import CustomizedInput from '../components/shared/CustomizedInput'
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Login() {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading("Signing In", { id: "login" })
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" })
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" })
    }
  }

  return (
    <Box className="scanlines" sx={{
      height: "90vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", bgcolor: "var(--bg)",
      "&::before": {
        content: '""', position: "absolute", inset: -200,
        background: "radial-gradient(ellipse at 40% 40%, rgba(0,255,135,0.08), transparent 55%)," +
          "radial-gradient(ellipse at 70% 60%, rgba(0,212,255,0.06), transparent 50%)",
        filter: "blur(80px)",
      },
      "&::after": {
        content: '""', position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04,
        backgroundImage:
          "repeating-linear-gradient(0deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)," +
          "repeating-linear-gradient(90deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)",
      },
    }}>
      <Box sx={{
        position: "relative", zIndex: 5, width: "100%", maxWidth: 460, mx: "auto", p: { xs: 3, md: 5 },
        bgcolor: "rgba(17,17,24,0.55)", border: "1px solid rgba(0,255,135,0.12)", borderRadius: 2,
        backdropFilter: "blur(14px)", boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,255,135,0.01)",
      }}>
        {/* Corner accents */}
        <Box sx={{ position: "absolute", top: -1, left: -1, width: 20, height: 20, borderTop: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)" }} />
        <Box sx={{ position: "absolute", top: -1, right: -1, width: 20, height: 20, borderTop: "2px solid var(--neon)", borderRight: "2px solid var(--neon)" }} />
        <Box sx={{ position: "absolute", bottom: -1, left: -1, width: 20, height: 20, borderBottom: "2px solid var(--neon)", borderLeft: "2px solid var(--neon)" }} />
        <Box sx={{ position: "absolute", bottom: -1, right: -1, width: 20, height: 20, borderBottom: "2px solid var(--neon)", borderRight: "2px solid var(--neon)" }} />

        <Typography sx={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: 3, textAlign: "center", color: "var(--neon)", textTransform: "uppercase", textShadow: "0 0 20px rgba(0,255,135,0.3)", mb: 1 }}>
          LOGIN
        </Typography>
        <Typography sx={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, mb: 3 }}>
          Enter the arena, player.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <CustomizedInput type='email' name='email' label='Email' />
            <CustomizedInput type='password' name='password' label='Password' />
            <Button type="submit" fullWidth sx={{
              mt: 2, py: 1.3, fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 14,
              letterSpacing: 2, textTransform: "uppercase", color: "#0A0A0F", bgcolor: "var(--neon)",
              borderRadius: 1, border: "1px solid var(--neon)", boxShadow: "var(--neon-glow)",
              ":hover": { bgcolor: "#00cc6a", boxShadow: "0 0 20px rgba(0,255,135,0.6), 0 0 50px rgba(0,255,135,0.25)" },
              gap: 1,
            }}>
              LOGIN <RiLoginBoxLine />
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login