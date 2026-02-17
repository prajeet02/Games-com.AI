import { useRef, useState } from 'react'
import { Avatar, Box, Button, IconButton, Typography} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from "react-icons/io";
import { sendChatRequest,deleteChatRequest} from '../helper/api-communicator';

type Message = {
  role: "user" | "assistant";
  content: string;  // ⚠️ Note: use "content", not "value"
 };

 export function Chat() {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const auth = useAuth()
  const [chatMessages,setChatMessages] = useState<Message[]>([]);
	  const userName = auth?.user?.name ?? "User";
	  const initials = userName
	    .split(" ")
	    .filter(Boolean)
	    .slice(0, 2)
	    .map((p) => p[0]?.toUpperCase() ?? "")
	    .join("") || "U";

  async function handleSubmit(){
	   const content = (inputRef.current?.value ?? "").trim();
	   if (!content) return;

    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newUserMessage = {role : "user" as const, content: content };
    setChatMessages((prev)=> [...prev, newUserMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chat])
  }
  
  const handleClear = async() => {
    try {
      await deleteChatRequest();
      setChatMessages([]);
    } catch (error) {
	      console.log("Failed to clear chat:", error);
    }
  }

  return (
    <Box className="scanlines" sx={{
      minHeight: "100dvh", position: "relative", overflow: "hidden", bgcolor: "var(--bg)",
      "&::before": {
        content: '""', position: "absolute", inset: -200,
        background:
          "radial-gradient(ellipse at 15% 35%, rgba(0,255,135,0.10), transparent 55%)," +
          "radial-gradient(ellipse at 80% 25%, rgba(0,212,255,0.08), transparent 50%)," +
          "radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.06), transparent 55%)",
        filter: "blur(80px)",
      },
      "&::after": {
        content: '""', position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04,
        backgroundImage:
          "repeating-linear-gradient(0deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)," +
          "repeating-linear-gradient(90deg,rgba(0,255,135,0.18) 0,rgba(0,255,135,0.18) 1px,transparent 1px,transparent 80px)",
      },
    }}>
      <Box sx={{ position: "relative", zIndex: 5, px: { xs: 1.5, md: 2.5 }, pt: { xs: 11, md: 11 }, pb: { xs: 2, md: 3 } }}>
        <Box sx={{
          display: "flex", gap: 0, overflow: "hidden", borderRadius: 2,
          border: "1px solid rgba(0,255,135,0.12)", bgcolor: "rgba(17,17,24,0.50)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 0 30px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,255,135,0.015)",
          height: { xs: "calc(100dvh - 150px)", md: "calc(100dvh - 160px)" },
        }}>
          {/* Left rail */}
          <Box sx={{
            display: { xs: "none", sm: "none", md: "flex" }, width: 300, flexDirection: "column",
            borderRight: "1px solid var(--line)", bgcolor: "rgba(10,10,15,0.40)",
          }}>
            <Box sx={{ p: 2.5, borderBottom: "1px solid var(--line)" }}>
              <Avatar alt="user" sx={{ width: 42, height: 42, bgcolor: "var(--neon-dim)", color: "var(--neon)", fontWeight: 800, fontFamily: "'Orbitron',sans-serif", fontSize: 14, border: "1px solid rgba(0,255,135,0.25)" }}>
                {initials}
              </Avatar>
              <Typography sx={{ mt: 1.2, fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1.5, color: "var(--neon)", textTransform: "uppercase" }}>
                Gaming AI
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
                Ask about games, builds & strats
              </Typography>
            </Box>
            <Box sx={{ p: 2.5, mt: "auto" }}>
              <Button onClick={handleClear} fullWidth sx={{
                color: "var(--text)", textTransform: "uppercase", fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700, fontSize: 13, letterSpacing: 1.5, borderRadius: 1,
                bgcolor: "rgba(255,0,60,0.10)", border: "1px solid rgba(255,0,60,0.30)",
                ":hover": { bgcolor: "rgba(255,0,60,0.18)", borderColor: "rgba(255,0,60,0.50)" },
              }}>
                ⟳ Clear Conversation
              </Button>
            </Box>
          </Box>

          {/* Main column */}
          <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {/* Header bar */}
            <Box sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              px: { xs: 2, md: 3 }, py: 1.4, borderBottom: "1px solid var(--line)", bgcolor: "rgba(10,10,15,0.30)",
            }}>
              <Typography sx={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: "var(--text)", textTransform: "uppercase" }}>
                Your Gaming Companion
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "var(--neon)", boxShadow: "0 0 6px var(--neon)" }} />
                <Typography sx={{ fontSize: 11, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, color: "var(--neon)", letterSpacing: 1.5, textTransform: "uppercase" }}>Online</Typography>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, px: { xs: 1.5, md: 2.5 }, py: { xs: 1.5, md: 2 }, overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth" }}>
              {chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
            </Box>

            {/* Input bar */}
            <Box sx={{ borderTop: "1px solid var(--line)", p: 1.5, bgcolor: "rgba(10,10,15,0.25)" }}>
              <Box sx={{
                display: "flex", alignItems: "center", gap: 1.2, px: 2, py: 1,
                borderRadius: 1, bgcolor: "rgba(17,17,24,0.60)", border: "1px solid rgba(0,255,135,0.10)",
              }}>
                <Typography sx={{ color: "var(--neon)", fontFamily: "'Orbitron',sans-serif", fontSize: 12, opacity: 0.5, userSelect: "none" }}>{">"}</Typography>
                <input
                  ref={inputRef} type="text" placeholder="Type your command…"
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleSubmit(); } }}
                  style={{ width: "100%", backgroundColor: "transparent", padding: "10px 4px", border: "none", outline: "none", color: "#E2E2E2", fontSize: "15px", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.5px" }}
                />
                <IconButton sx={{ ml: "auto", color: "var(--neon)", ":hover": { bgcolor: "var(--neon-dim)" } }} onClick={handleSubmit}>
                  <IoMdSend />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Chat