import { useState, useEffect } from "react";
import {
  getWallet,
  getLatestPrice,
  createRazorpayOrder,
  confirmRazorpayPayment,
} from "../services/api";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [wallet, setWallet] = useState(0);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [open, setOpen] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    refresh();
  }, []);

  const refresh = async () => {
    const walletRes = await getWallet(user.id);
    setWallet(walletRes.data || 0);

    const priceRes = await getLatestPrice();
    setPrice(priceRes.data.goldPricePerGram);
  };

  // ----------- RAZORPAY ----------
  const startPayment = async () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    setLoadingPay(true);

    try {
      const orderRes = await createRazorpayOrder(user.id, amount, method);
      const { keyId, orderId, amountInPaise } = orderRes.data;

      const options = {
        key: keyId,
        amount: amountInPaise,
        currency: "INR",
        name: "Digital Gold",
        description: "Buy 24K Gold",
        order_id: orderId,
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9876543210",
        },
        theme: { color: "#002970" },
        handler: async function (response) {
          try {
            await confirmRazorpayPayment({
              userId: user.id,
              amount: Number(amount),
              method,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            alert("Payment success! Gold credited to wallet.");
            await refresh();
            setOpen(false);
          } catch (e) {
            console.error(e);
            alert("Payment success but backend confirmation failed.");
          }
        },
        modal: {
          ondismiss: () => setLoadingPay(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment could not be started.");
    } finally {
      setLoadingPay(false);
    }
  };

  if (!user) return null;

  return (
    <Box minHeight="100vh" bgcolor="#F2F6FF">
      {/* NAVBAR */}
      <AppBar position="static" sx={{ bgcolor: "#002970", py: 1.5 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1, fontWeight: 700, fontSize: 22 }}>
            Digital Gold
          </Typography>
          <Typography sx={{ mr: 3, fontSize: 18, fontWeight: 700 }}>
            {user.name}
          </Typography>
          <Button
            sx={{ color: "white" }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #002970, #0050C8)",
          py: 8,
          px: 4,
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: 34, fontWeight: 700 }}>
          Build Wealth. Secure Tomorrow.
        </Typography>
        <Typography sx={{ maxWidth: 550, mt: 1 }}>
          Invest in 24K Digital Gold with secure vault storage and live pricing.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: "white",
            color: "#002970",
            fontWeight: 700,
            px: 4,
            py: 1.2,
            borderRadius: 10,
          }}
          onClick={() => setOpen(true)}
        >
          Buy Gold
        </Button>
      </Box>

      {/* PROFILE */}
      <Box
        sx={{
          mt: -3,
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          mx: 4,
          p: 2,
          borderRadius: 3,
          boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <Avatar sx={{ bgcolor: "#002970", width: 56, height: 56, mr: 2 }}>
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 22, color: "#002970" }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: 15, color: "gray", mt: 0.5 }}>
            Account Holder • Digital Gold Portfolio
          </Typography>
          <Typography sx={{ fontSize: 14, mt: 0.5, color: "#555" }}>
            Email: {user.email}
          </Typography>
        </Box>
      </Box>

      {/* PORTFOLIO */}
      <Box p={4}>
        <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 2 }}>
          Your Portfolio
        </Typography>

        <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 0 18px rgba(0,0,0,0.08)" }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Gold Balance
          </Typography>
          <Typography
            sx={{ fontSize: 36, fontWeight: 800, color: "#002970", mt: 1 }}
          >
            {wallet.toFixed(5)} g
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 18 }}>
            Live Price: ₹ {price.toFixed(2)} / gram
          </Typography>
        </Card>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4, bgcolor: "#002970", py: 1.4, fontSize: 18 }}
          onClick={() => setOpen(true)}
        >
          Buy More Gold
        </Button>
      </Box>

      {/* PAYMENT POPUP */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent sx={{ width: 360 }}>
          <Typography variant="h6" fontWeight={700}>
            Buy Gold
          </Typography>
          <TextField
            fullWidth
            label="Amount (₹)"
            type="number"
            sx={{ mt: 2 }}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Typography sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
            Payment Method
          </Typography>
          <Box display="flex" justifyContent="space-around">
            <PaymentsIcon
              onClick={() => setMethod("UPI")}
              sx={{ fontSize: 38, cursor: "pointer", color: method === "UPI" ? "#002970" : "gray" }}
            />
            <CreditCardIcon
              onClick={() => setMethod("CARD")}
              sx={{ fontSize: 38, cursor: "pointer", color: method === "CARD" ? "#002970" : "gray" }}
            />
            <AccountBalanceIcon
              onClick={() => setMethod("NETBANKING")}
              sx={{ fontSize: 38, cursor: "pointer", color: method === "NETBANKING" ? "#002970" : "gray" }}
            />
          </Box>

          <Typography sx={{ mt: 3, fontSize: 13, color: "gray" }}>
            You will pay securely through Razorpay (UPI / Card / Netbanking)
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#002970" }}
            onClick={startPayment}
            disabled={loadingPay}
          >
            {loadingPay ? "Processing..." : "Proceed to Pay"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
