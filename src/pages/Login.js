import { login } from "../services/api";

const signin = async () => {
  try {
    const res = await login(email, password);

    if (!res.data || !res.data.id) {
      alert("Invalid login details!");
      return;
    }

    // Save user in localStorage
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
    alert("Login failed! Check your email/password.");
  }
};
