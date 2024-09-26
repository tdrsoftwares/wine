import React from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AllUsersDialog = ({ open, onClose, allUsers, handleDeleteUser, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>All Users</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Setting header background and text color */}
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  First Name
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Last Name
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Email
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Phone Number
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Username
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Status
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Role
                </TableCell>
                <TableCell sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user._id}>
                  {/* Setting row background to white */}
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.firstName}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.username}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    {user.roleId ? user.roleId.name : "No Role"}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "white" }}>
                    <IconButton
                      color="error"
                      aria-label="delete user"
                      onClick={() => handleDeleteUser(user._id)}
                      size="small"
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
  );
};

export default AllUsersDialog;
