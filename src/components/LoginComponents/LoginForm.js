import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import { url } from "../../utils/apiDomain";
import { FaIdCard } from "react-icons/fa";
import CryptoJS from "crypto-js";

function LoginForm({ handleLogin }) {
  const [customerId, setCustomerId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] =
    useState(false);
  const [resetPasswordInputsEnabled, setResetPasswordInputsEnabled] =
    useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dialogEmail, setDialogEmail] = useState("");
  const navigate = useNavigate();

  const customerIdRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !customerId.trim()) {
      NotificationManager.warning("Please enter all fields.", "Warning", 2000);
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

    // Encrypt the password
    const encryptedPassword = CryptoJS.SHA256(password).toString();

    try {
      const response = await axios.post(url + `/user-master/login`, {
        customerId,
        email,
        password: encryptedPassword,
      });

      const { accessToken, refreshToken } = response.data.data;
      //  console.log("accessToken: ", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;
      // localStorage.setItem("x-db-name", customerId);

      if (response.status === 200) {
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

  const handleForgotPassword = async () => {
    if (!dialogEmail.trim()) {
      NotificationManager.warning(
        "Please enter your email address.",
        "Warning"
      );
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(dialogEmail)) {
      NotificationManager.warning(
        "Please enter a valid email address.",
        "Warning"
      );
      return;
    }

    try {
      const response = await axios.post(
        `${url}/user-master/forget-password?email=${dialogEmail}`
      );

      if (response.status === 200) {
        NotificationManager.success(
          "OTP has been sent to your email.",
          "Success"
        );
        setResetPasswordInputsEnabled(true); // Enable OTP and password fields
      } else {
        NotificationManager.error(
          "Failed to send OTP. Please try again.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "An error occurred. Please try again later.",
        "Error"
      );
    }
  };

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      NotificationManager.warning("Please fill all fields.", "Warning");
      return;
    }
  
    // Encrypt the password
    const encryptedPassword = CryptoJS.SHA256(newPassword).toString();
  
    try {
      const response = await axios.put(`${url}/user-master/reset-password`, {
        otp: otp,
        newPassword: encryptedPassword, // Send the encrypted password
      });
  
      if (response.status === 200) {
        NotificationManager.success(
          "Your password has been reset successfully.",
          "Success"
        );
        setOpenForgotPasswordDialog(false);
      } else {
        NotificationManager.error(
          "Failed to reset password. Please try again.",
          "Error"
        );
      }
    } catch (error) {
      NotificationManager.error(
        "An error occurred. Please try again later.",
        "Error"
      );
    }
  };

  useEffect(() => {
    customerIdRef.current.focus();
  }, []);

  return (
    <Container
      className="form-container"
      component="main"
      sx={{
        // padding: 4,
        maxWidth: "360px !important",
        backgroundColor: "#f9f9f9",
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
          variant="filled"
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
              <InputAdornment
                position="end"
                disablePointerEvents
                sx={{ marginRight: 1 }}
              >
                <IconButton edge="end">
                  <FaIdCard />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          margin="dense"
          variant="filled"
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
              <InputAdornment
                position="end"
                disablePointerEvents
                sx={{ marginRight: 1 }}
              >
                <IconButton edge="end">
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          required
          margin="dense"
          variant="filled"
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
              <InputAdornment position="end" sx={{ marginRight: 1 }}>
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
            <Button
              variant="text"
              onClick={() => {
                setDialogEmail(email);
                setOpenForgotPasswordDialog(true);
              }}
              sx={{ textTransform: "none" }}
            >
              Forgot password?
            </Button>
          </Grid>

          <Dialog
            open={openForgotPasswordDialog}
            onClose={() => setOpenForgotPasswordDialog(false)}
            aria-labelledby="forgot-password-dialog-title"
            fullWidth
            maxWidth="xs"
            sx={{
              "& .MuiDialog-paper": {
                maxWidth: "360px",
                width: "100%",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DialogTitle id="forgot-password-dialog-title">
              {resetPasswordInputsEnabled
                ? "Reset Password"
                : "Forgot Password"}
            </DialogTitle>
            <DialogContent>
              {/* Email input section (shown if OTP not yet sent) */}
              {!resetPasswordInputsEnabled && (
                <TextField
                  autoFocus
                  margin="dense"
                  id="dialogEmail"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="filled"
                  value={dialogEmail}
                  onChange={(e) => setDialogEmail(e.target.value)}
                />
              )}

              {/* OTP and New Password fields (shown after OTP is sent) */}
              {resetPasswordInputsEnabled && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="otp"
                    label="Enter OTP"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value;
                      if(!isNaN(value)) {
                        setOtp(e.target.value)}}
                      }
                  />
                  <TextField
                    margin="dense"
                    id="newPassword"
                    label="New Password"
                    fullWidth
                    variant="filled"
                    value={newPassword}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ marginRight: 1 }}>
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
                </>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setOpenForgotPasswordDialog(false)
                  setDialogEmail("");
                  setOtp("");
                  setNewPassword("");
                }}
                color="primary"
              >
                Cancel
              </Button>
              {/* "Get OTP" or "Reset" button based on dialog state */}
              {!resetPasswordInputsEnabled ? (
                <Button onClick={handleForgotPassword} color="primary">
                  Get OTP
                </Button>
              ) : (
                <Button onClick={handleResetPassword} color="primary">
                  Reset Password
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </Grid>
      </form>
      <NotificationContainer />
    </Container>
  );
}

export default LoginForm;
