// userControll
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createUser,
  deleteRole,
  getAllRoleAndPermissions,
  getAllRoleNames,
  getAllUsers,
} from "../services/userService";
import { NotificationManager } from "react-notifications";
import CreateUserDialog from "./CreateUserDialog";
import CreateRolesDialog from "./CreateRolesDialog";
import RolesAndPermissionsDialog from "./RolesAndPermissionsDialog";
import AllUsersDialog from "./AllUsersDialog";

const UserControl = ({}) => {
  const [openRolesAndPermissionDialog, setOpenRolesAndPermissionDialog] =
    useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openCreateRoles, setOpenCreateRoles] = useState(false);
  const [openAllUsersDialog, setOpenAllUsersDialog] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [createUserData, setCreateUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    // customerId: "",
    phoneNumber: "",
    roleId: "",
    password: "",
  });

  const [createRolesData, setCreateRolesData] = useState({
    roleName: "",
    description: "",
    moduleId: "",
    permissions: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [allRoleAndPermissions, setAllRoleAndPermissions] = useState([]);

  // console.log("createuser data: ", createRolesData);

  // permission checkbox changes
  const handlePermissionChange = (
    roleIndex,
    moduleIndex,
    permissionType,
    isChecked
  ) => {
    const updatedRoles = [...allRoleAndPermissions];
    updatedRoles[roleIndex].modulePermission[
      moduleIndex
    ].permission.permissions[permissionType] = isChecked;
    setAllRoleAndPermissions(updatedRoles);
  };

  const fetchAllRoleNames = async () => {
    try {
      const allRoles = await getAllRoleNames();
      console.log("allroles response: ", allRoles);

      if (allRoles.status === 200) {
        setAllRoles(allRoles?.data?.data);
      } else {
        // NotificationManager.error("No roles found", "Error");
        setAllRoles([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching roles. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching roles:", error);
    }
  };

  const fetchAllRoleAndPermissions = async () => {
    try {
      const allRoleAndPermissions = await getAllRoleAndPermissions();
      // console.log("getAllRoleAndPermissions response: ", allRoleAndPermissions);

      if (allRoleAndPermissions.status === 200) {
        setAllRoleAndPermissions(allRoleAndPermissions?.data?.data);
      } else {
        // NotificationManager.error("No role and permissions found", "Error");
        setAllRoleAndPermissions([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching role and permissions. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching role and permissions:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      // console.log("allusers response: ", allUsers);

      if (allUsers.status === 200) {
        setAllUsers(allUsers?.data?.data);
      } else {
        // NotificationManager.error("No roles found", "Error");
        setAllUsers([]);
      }
    } catch (error) {
      // NotificationManager.error(
      //   "Error fetching roles. Please try again later.",
      //   "Error"
      // );
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchAllRoleNames();
  }, []);

  useEffect(() => {
    fetchAllRoleAndPermissions();
  }, [openRolesAndPermissionDialog]);

  useEffect(() => {
    fetchAllUsers();
  }, [openAllUsersDialog]);

  const isFormComplete = () => {
    return Object.values(createUserData).every((value) => value !== "");
  };

  const handleCreateUser = async () => {
    const payload = {
      firstName: createUserData.firstName,
      lastName: createUserData.lastName,
      username: createUserData.userName,
      email: createUserData.email,
      // customerId: createUserData.customerId,
      phoneNumber: createUserData.phoneNumber,
      roleId: createUserData.roleId,
      password: createUserData.password,
    };

    if (
      !createUserData.firstName ||
      !createUserData.lastName ||
      !createUserData.userName ||
      !createUserData.email ||
      // !createUserData.customerId ||
      !createUserData.phoneNumber ||
      !createUserData.roleId ||
      !createUserData.password
    ) {
      NotificationManager.error("All fields are required", "Validation Error");
      return;
    }

    try {
      const response = await createUser(payload);

      if (response.status === 200) {
        NotificationManager.success("User created successfully", "Succes");
        setOpenCreateUser(false);
        setCreateUserData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          // customerId: "",
          phoneNumber: "",
          roleId: "",
          password: "",
        });
      } else {
        NotificationManager.error("Failed to create user", "Error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      NotificationManager.error("Error creating user. Please try again.");
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await deleteRole(roleId);

      if (response && response.status === 200) {
        const updatedRoles = allRoleAndPermissions.filter(
          (role) => role._id !== roleId
        );
        setAllRoleAndPermissions(updatedRoles);
        NotificationManager.success("Role deleted successfully", "Success");
      } else {
        NotificationManager.error("Error deleting role!", "Error");
      }
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: "600px",
        mx: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h6" gutterBottom>
        User Control
      </Typography>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Button
          color="primary"
          size="small"
          variant="contained"
          fullWidth
          onClick={() => setOpenCreateUser(true)}
          sx={{
            marginTop: 1,
            fontSize: "11px",
          }}
        >
          CREATE USER
        </Button>

        <Button
          color="info"
          size="small"
          variant="contained"
          fullWidth
          onClick={() => setOpenAllUsersDialog(true)}
          sx={{
            marginTop: 1,
            fontSize: "11px",
          }}
        >
          ALL USERS
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" gap={2}>
        <Button
          color="primary"
          size="small"
          variant="contained"
          fullWidth
          onClick={() => setOpenCreateRoles(true)}
          sx={{
            marginTop: 1,
            fontSize: "11px",
          }}
        >
          CREATE ROLES
        </Button>

        <Button
          color="info"
          size="small"
          variant="contained"
          fullWidth
          onClick={() => setOpenRolesAndPermissionDialog(true)}
          sx={{
            marginTop: 1,
            fontSize: "11px",
          }}
        >
          ALL ROLES AND PERMISSIONS
        </Button>
      </Box>

      <CreateUserDialog
        createUserData={createUserData}
        setCreateUserData={setCreateUserData}
        openCreateUser={openCreateUser}
        setOpenCreateUser={setOpenCreateUser}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleCreateUser={handleCreateUser}
        isFormComplete={isFormComplete}
        allRoles={allRoles}
      />

      <CreateRolesDialog
        createRolesData={createRolesData}
        setCreateRolesData={setCreateRolesData}
        openCreateRoles={openCreateRoles}
        setOpenCreateRoles={setOpenCreateRoles}
      />

      <RolesAndPermissionsDialog
        open={openRolesAndPermissionDialog}
        onClose={() => setOpenRolesAndPermissionDialog(false)}
        allRoleAndPermissions={allRoleAndPermissions}
        handleDeleteRole={handleDeleteRole}
        handlePermissionChange={handlePermissionChange}
      />

      <AllUsersDialog
        open={openAllUsersDialog}
        onClose={() => setOpenAllUsersDialog(false)}
        allUsers={allUsers}
      />
    </Paper>
  );
};

export default UserControl;
