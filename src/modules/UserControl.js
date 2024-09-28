// userControll
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createUser,
  deleteRole,
  deleteUser,
  getAllRoleAndPermissions,
  getAllRoleNames,
  getAllUsers,
  updateRolePermissions,
  updateUser,
} from "../services/userService";
import { NotificationManager } from "react-notifications";
import CreateUserDialog from "./CreateUserDialog";
import CreateRolesDialog from "./CreateRolesDialog";
import RolesAndPermissionsDialog from "./RolesAndPermissionsDialog";
import AllUsersDialog from "./AllUsersDialog";
import { usePermissions } from "../utils/PermissionsContext";

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
  const [loading, setLoading] = useState(false);
  const { permissions, role } = usePermissions();

  const userPermission =
    permissions?.find((permission) => permission.moduleName === "User")
      ?.permissions || [];
  const canCreate = userPermission.includes("create");
  const canRead = userPermission.includes("read");
  const canUpdate = userPermission.includes("update");
  const canDelete = userPermission.includes("delete");

  const fetchAllRoleNames = async () => {
    try {
      const allRoles = await getAllRoleNames();
      // console.log("allroles response: ", allRoles);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const handleUpdateUser = async (user) => {
    // console.log("user: ", user);
    setLoading(true);

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      roleId: user.roleId?._id,
    };
    
    try {
      const response = await updateUser(payload, user._id);
      if (response.status === 200) {
        NotificationManager.success("User updated successfully.", "Success");
        fetchAllUsers();
      } else {
        NotificationManager.error("Error updating user!", "Error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      NotificationManager.error("Error updating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await deleteUser(userId);

      if (response.status === 200) {
        setAllUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        NotificationManager.success("User deleted successfully.", "Success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      NotificationManager.error("Error deleting user:", "Success");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (roleIndex, moduleIndex, permissionType, isChecked) => {

    const updatedRoles = allRoleAndPermissions.map((role, rIndex) => {
      if (rIndex === roleIndex) {
        const updatedModulePermission = role.modulePermission.map((module, mIndex) => {
          if (mIndex === moduleIndex) {

            return {
              ...module,
              permission: {
                ...module.permission,
                permissions: {
                  ...module.permission.permissions,
                  [permissionType]: isChecked
                }
              }
            };
          }
          return module;
        });
  
        return {
          ...role,
          modulePermission: updatedModulePermission
        };
      }
      return role;
    });
    setAllRoleAndPermissions(updatedRoles);
  }; 

  const handleRolesAndPermissionUpdate = async (roleIndex, moduleIndex) => {
    setLoading(true);
    const updatedRole = allRoleAndPermissions[roleIndex];
    const updatedModule = updatedRole.modulePermission[moduleIndex];

    const payload = {
      roleId: updatedRole._id,
      moduleId: updatedModule.permission.moduleId._id,
      permissions: updatedModule.permission.permissions,
    };

    try {
      const response = await updateRolePermissions(payload);
      if (response.status === 200) {
        NotificationManager.success(
          "Permissions updated successfully",
          "Success"
        );
      } else {
        NotificationManager.error("Failed to update permissions", "Error");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      NotificationManager.error(
        "Error updating permissions. Please try again.",
        "Error"
      );
    } finally {
      setLoading(false);
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
          disabled={role !== "admin"}
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
          disabled={role !== "admin"}
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
          disabled={role !== "admin"}
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
          disabled={role !== "admin"}
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
        handleRolesAndPermissionUpdate={handleRolesAndPermissionUpdate}
        loading={loading}
      />

      <AllUsersDialog
        open={openAllUsersDialog}
        onClose={() => {
          setOpenAllUsersDialog(false);
          fetchAllUsers();
        }}
        allUsers={allUsers}
        handleDeleteUser={handleDeleteUser}
        handleUpdateUser={handleUpdateUser}
        loading={loading}
      />
    </Paper>
  );
};

export default UserControl;
