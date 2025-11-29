import { useState } from "react";
import { login } from "../services/api";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const res = await login(email, password);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        })
      );

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid login details!");
    }
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ width: 420, p: 5, borderRadius: 3, boxShadow: "0 0 30px rgba(0,0,0,0.15)" }}>
        <Typography variant="h4" textAlign="center">Welcome Back</Typography>
        <TextField fullWidth label="Email" sx={{ mt: 3 }} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#002970" }} onClick={signin}>Login</Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => (window.location.href = "/")}>Create Account</Button>
      </Paper>
    </Box>
  );
}
