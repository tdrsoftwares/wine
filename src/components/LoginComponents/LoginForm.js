import axios from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { url } from "../../utils/apiDomain";
import { useLoginContext } from "../../utils/loginContext";
import axiosInstance from "../../utils/axiosInstance";

function LoginForm({ handleLogin }) {
  const { setLoginResponse } = useLoginContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      NotificationManager.warning(
        "Please enter both email and password.",
        "Warning",
        2000
      );
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      NotificationManager.warning(
        "Please enter a valid email address.",
        "Warning"
      );
      return;
    }

    try {
      const response = await axios.post(`${url}/user/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data.data;
      console.log("accessToken: ", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;

      NotificationManager.success("Login successful.", "Success");
      setLoginResponse(response.data.data);
      handleLogin(email);

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        NotificationManager.error(
          "Invalid email or password. Please try again.",
          "Error"
        );
      } else {
        NotificationManager.error(
          "Failed to sign in. Please try again.",
          "Error"
        );
      }
    }
  };

  return (
    <Container
      className="form-container"
      component="main"
      maxWidth="xs"
      sx={{
        padding: 4,
        // margin: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography component="h1" variant="h5" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          size="medium"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          size="medium"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundImage: "linear-gradient(#6a11cb 0%, #3b25fc 100%)",
          }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          {/* <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid> */}
        </Grid>
      </form>
      <NotificationContainer />
    </Container>
  );
}

export default LoginForm;
