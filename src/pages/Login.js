import { useState } from "react";
import { login } from "../services/api";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import "../theme.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    const res = await login(email, password);
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.href = "/dashboard";
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ width: 420, p: 5, borderRadius: 3, boxShadow: "0 0 30px rgba(0,0,0,0.15)" }}>
        <Typography className="fintech-title" variant="h4" textAlign="center">Welcome Back</Typography>
        <TextField fullWidth label="Email" sx={{ mt: 3 }} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={(e) => setPassword(e.target.value)} />

        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#002970" }} onClick={signin}>Login</Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => window.location.href = "/"}>Create Account</Button>
      </Paper>
    </Box>
  );
}
