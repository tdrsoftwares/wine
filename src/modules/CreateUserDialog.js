import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { customTheme } from "../utils/customTheme";

const CreateUserDialog = (props) => {
  const {
    createUserData,
    setCreateUserData,
    showPassword,
    setShowPassword,
    isFormComplete,
    handleCreateUser,
    openCreateUser,
    setOpenCreateUser,
    allRoles,
  } = props;
  return (
    <ThemeProvider theme={customTheme}>
      <Dialog
        open={openCreateUser}
        onClose={() => setOpenCreateUser(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Box mb={2} p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="firstName"
                    className="input-label"
                    required
                  >
                    First Name:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="firstName"
                    className="input-field"
                    value={createUserData.firstName}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="lastName"
                    className="input-label"
                    required
                  >
                    Last Name:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="lastName"
                    className="input-field"
                    value={createUserData.lastName}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="userName"
                    className="input-label"
                    required
                  >
                    User Name:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="userName"
                    className="input-field"
                    value={createUserData.userName}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        userName: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="email" className="input-label" required>
                    Email:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="email"
                    type="email"
                    className="input-field"
                    value={createUserData.email}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="customerId"
                    className="input-label"
                    required
                  >
                    Customer Id:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="customerId"
                    className="input-field"
                    value={createUserData.customerId}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        customerId: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="phoneNumber"
                    className="input-label"
                    required
                  >
                    Phone No:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="phoneNumber"
                    className="input-field"
                    value={createUserData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value)) {
                        setCreateUserData({
                          ...createUserData,
                          phoneNumber: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="roleId" className="input-label" required>
                    Role Id:
                  </InputLabel>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    name="roleId"
                    className="input-field"
                    value={createUserData.roleId}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        roleId: e.target.value,
                      })
                    }
                  >
                    {allRoles?.map((item) => {
                      return (
                        <MenuItem value={item._id} key={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel
                    htmlFor="password"
                    className="input-label"
                    required
                  >
                    Password:
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input-field"
                    value={createUserData.password}
                    onChange={(e) =>
                      setCreateUserData({
                        ...createUserData,
                        password: e.target.value,
                      })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" sx={{ marginRight: 1 }}>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPassword(
                                (prevShowPassword) => !prevShowPassword
                              )
                            }
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCreateUser(false);
              setCreateUserData({
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                customerId: "",
                phoneNumber: "",
                roleId: "",
                password: "",
              });
            }}
            color="secondary"
          >
            Close
          </Button>
          <Button
            onClick={handleCreateUser}
            color="primary"
            disabled={!isFormComplete()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CreateUserDialog;
