import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from '../components/shared/CustomizedInput'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function Signup() {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading("Creating Account", { id: "signup" })
      await auth?.signup(name, email, password);
      toast.success("Account Created!", { id: "signup" })
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed", { id: "signup" })
    }
  }

  return (
    <Box className="scanlines" sx={{
      minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", bgcolor: "var(--bg)",
      "&::before": {
        content: '""', position: "absolute", inset: -200,
        background: "radial-gradient(ellipse at 60% 35%, rgba(0,212,255,0.08), transparent 55%)," +
          "radial-gradient(ellipse at 30% 65%, rgba(139,92,246,0.06), transparent 50%)",
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
        bgcolor: "rgba(17,17,24,0.55)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: 2,
        backdropFilter: "blur(14px)", boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,212,255,0.01)",
      }}>
        <Box sx={{ position: "absolute", top: -1, left: -1, width: 20, height: 20, borderTop: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" }} />
        <Box sx={{ position: "absolute", top: -1, right: -1, width: 20, height: 20, borderTop: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" }} />
        <Box sx={{ position: "absolute", bottom: -1, left: -1, width: 20, height: 20, borderBottom: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" }} />
        <Box sx={{ position: "absolute", bottom: -1, right: -1, width: 20, height: 20, borderBottom: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" }} />

        <Typography sx={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: 3, textAlign: "center", color: "var(--cyan)", textTransform: "uppercase", textShadow: "0 0 20px rgba(0,212,255,0.3)", mb: 1 }}>
          SIGN UP
        </Typography>
        <Typography sx={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, mb: 3 }}>
          Create your player profile.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <CustomizedInput type='text' name='name' label='Username' />
            <CustomizedInput type='email' name='email' label='Email' />
            <CustomizedInput type='password' name='password' label='Password' />
            <Button type="submit" fullWidth sx={{
              mt: 2, py: 1.3, fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 14,
              letterSpacing: 2, textTransform: "uppercase", color: "#0A0A0F", bgcolor: "var(--cyan)",
              borderRadius: 1, border: "1px solid var(--cyan)",
              boxShadow: "0 0 8px rgba(0,212,255,0.45), 0 0 28px rgba(0,212,255,0.12)",
              ":hover": { bgcolor: "#00B8D9", boxShadow: "0 0 20px rgba(0,212,255,0.6), 0 0 50px rgba(0,212,255,0.25)" },
              gap: 1,
            }}>
              CREATE ACCOUNT
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Signup