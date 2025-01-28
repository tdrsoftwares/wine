import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  CircularProgress,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { customTheme } from "../utils/customTheme";

const AllUsersDialog = ({
  open,
  onClose,
  allUsers,
  handleDeleteUser,
  handleUpdateUser,
  loading,
}) => {
  const [editableUsers, setEditableUsers] = useState(allUsers);
  const [saveEnabled, setSaveEnabled] = useState({});
  const [userLoading, setUserLoading] = useState({});

  useEffect(() => {
    if (allUsers) {
      setEditableUsers(allUsers);
    }
  }, [allUsers]);

  const handleInputChange = (userId, field, value) => {
    setEditableUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, [field]: value } : user
      )
    );
    setSaveEnabled((prev) => ({ ...prev, [userId]: true }));
  };

  const handleSave = async (userId) => {
    const userToUpdate = editableUsers.find((user) => user._id === userId);
    setUserLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      await handleUpdateUser(userToUpdate);
      setSaveEnabled((prev) => ({ ...prev, [userId]: false }));
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setUserLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>All Users</DialogTitle>
        <DialogContent>
          <TableContainer
            component={Paper}
            sx={{
              height: 300,
              width: "100%",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: 10,
                height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#fff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d5d8df",
                borderRadius: 2,
              },
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow className="table-head-2">
                  <TableCell sx={{ minWidth: "120px" }}>First Name</TableCell>
                  <TableCell sx={{ minWidth: "120px" }}>Last Name</TableCell>
                  <TableCell sx={{ minWidth: "180px" }}>Email</TableCell>
                  <TableCell sx={{ minWidth: "120px" }}>Phone Number</TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>Username</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>Status</TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>Role</TableCell>
                  <TableCell sx={{ minWidth: "80px" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={12}
                      align="center"
                      sx={{
                        backgroundColor: "#fff !important",
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : allUsers?.length > 0 ? (
                  editableUsers?.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <TextField
                          value={user.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              user._id,
                              "firstName",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={user.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              user._id,
                              "lastName",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={user.email}
                          onChange={(e) =>
                            handleInputChange(user._id, "email", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={user.phoneNumber}
                          onChange={(e) =>
                            handleInputChange(
                              user._id,
                              "phoneNumber",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={user.username}
                          onChange={(e) =>
                            handleInputChange(
                              user._id,
                              "username",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        {user.status ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>
                        {user.roleId ? user?.roleId?.name : "No Role"}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <IconButton
                            color="primary"
                            aria-label="save user"
                            onClick={() => handleSave(user._id)}
                            size="small"
                            disabled={
                              !saveEnabled[user._id] ||
                              loading ||
                              userLoading[user._id]
                            }
                          >
                            {userLoading[user._id] ? (
                              <CircularProgress size={24} />
                            ) : (
                              <SaveIcon />
                            )}
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label="delete user"
                            onClick={() => handleDeleteUser(user._id)}
                            size="small"
                            disabled={loading || userLoading[user._id]}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AllUsersDialog;
