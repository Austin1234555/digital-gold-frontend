import { Box, Button, Typography } from "@mui/material";

export default function Welcome() {
  return (
    <Box bgcolor="#E8F0FF" minHeight="100vh" display="flex" flexDirection="column"
      justifyContent="center" alignItems="center" textAlign="center" px={3}>

      <Typography variant="h3" fontWeight="bold" sx={{ color: "#0A4EFF" }}>
        Digital Gold
      </Typography>
      <Typography sx={{ color: "#5A5A5A", mt: 1, fontSize: 18 }}>
        Secure • Simple • Instant
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 6, bgcolor: "#0A4EFF", width: 260, fontSize: 18, p: 1.3 }}
        onClick={() => (window.location.href = "/login")}
      >
        Login
      </Button>

      <Button
        variant="outlined"
        sx={{ mt: 2, width: 260, borderColor: "#0A4EFF", color: "#0A4EFF", fontSize: 18, p: 1.3 }}
        onClick={() => (window.location.href = "/signup")}
      >
        Create Account
      </Button>
    </Box>
  );
}
