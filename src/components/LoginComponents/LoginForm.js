import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NotificationContainer, NotificationManager } from "react-notifications";
import axios from "axios";
import { url } from "../../utils/apiDomain";
import { FaIdCard } from "react-icons/fa";

function LoginForm({ handleLogin }) {
  const [customerId, setCustomerId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const customerIdRef = useRef(null);

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
      const response = await axios.post(url+ `/user-master/login`, { email, password, customerId });

      const { accessToken, refreshToken } = response.data.data;
      //  console.log("accessToken: ", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;
      localStorage.setItem("x-db-name", customerId);

      if(response.status === 200) {
        NotificationManager.success("Login successful.", "Success");
        handleLogin(email);
      } else {
        navigate("/");
      }

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

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(()=>{
    customerIdRef.current.focus();
  },[])

  return (
    <Container
      className="form-container"
      component="main"
      sx={{
        // padding: 4,
        maxWidth: "360px !important",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography component="h1" variant="h5" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
      <TextField
          fullWidth
          required
          inputRef={customerIdRef}
          margin="dense"
          size="small"
          id="customerId"
          label="Customer Id"
          name="customerId"
          autoComplete="customerId"
          autoFocus
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" disablePointerEvents sx={{ marginRight: 1}}>
                <IconButton edge="end">
                  <FaIdCard/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          margin="dense"
          size="small"
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" disablePointerEvents sx={{ marginRight: 1}}>
                <IconButton edge="end">
                  <EmailIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          margin="dense"
          size="small"
          name="password"
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: 1}}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
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
