import { useState } from "react";
import { signup } from "../services/api";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await signup(name, email, password);
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      alert("Signup failed! Email may already exist.");
    }
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ width: 420, p: 5, borderRadius: 3, boxShadow: "0 0 30px rgba(0,0,0,0.15)" }}>
        <Typography variant="h4" textAlign="center">Create Account</Typography>
        <TextField fullWidth label="Full Name" sx={{ mt: 3 }} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" sx={{ mt: 2 }} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" sx={{ mt: 2 }} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#002970" }} onClick={register}>Sign Up</Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => (window.location.href = "/login")}>Already have an account? Login</Button>
      </Paper>
    </Box>
  );
}
