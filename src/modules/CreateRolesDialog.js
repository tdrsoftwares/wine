import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  InputLabel,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createRole, getAllModules } from "../services/userService";
import { NotificationManager } from "react-notifications";
import { customTheme } from "../utils/customTheme";

const CreateRolesDialog = (props) => {
  const { createRolesData, setCreateRolesData, openCreateRoles, setOpenCreateRoles } = props;
  const [modulePermissions, setModulePermissions] = useState([]);

  // console.log("modulePermissions: ", modulePermissions);

  const fetchAllModules = async () => {
    try {
      const allModulesResponse = await getAllModules();
      if (allModulesResponse.status === 200) {

        const modulesData = allModulesResponse?.data?.data.map((module) => ({
          moduleId: module._id,
          moduleName: module.name,
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        }));
        // console.log("modulesData: ", modulesData);
        setModulePermissions(modulesData);
      } else {
        setModulePermissions([]);
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      NotificationManager.error("Error fetching modules!", "Error");
    }
  };

  useEffect(() => {
    fetchAllModules();
  }, [openCreateRoles]);


  const handlePermissionChange = (index, event) => {
    const { name, checked } = event.target;
    const newModules = [...modulePermissions];
    newModules[index].permissions[name] = checked;
    setModulePermissions(newModules);
  };


  const handleCreateRole = async () => {
    if (!createRolesData.roleName || !createRolesData.description) {
      NotificationManager.warning("Please fill in all required fields", "Warning");
      return;
    }

    const hasPermission = modulePermissions.some(
      (module) =>
        module.permissions.create ||
        module.permissions.read ||
        module.permissions.update ||
        module.permissions.delete
    );

    if (!hasPermission) {
      NotificationManager.warning(
        "Please select at least one permission for one module",
        "Warning"
      );
      return;
    }

    const payload = {
      rollName: createRolesData.roleName,
      descriptions: createRolesData.description,
      modulePermission: modulePermissions.map((module) => ({
        moduleId: module.moduleId,
        permission: Object.keys(module.permissions)
          .filter((key) => module.permissions[key])
          .map((perm) => ({ name: perm })),
      })),
    };

    try {
      const response = await createRole(payload);

      if (response.status === 201) {
        NotificationManager.success("Role created successfully", "Success");

        setOpenCreateRoles(false);
        setCreateRolesData({
          roleName: "",
          description: "",
        });
        setModulePermissions([]);
      } else {
        NotificationManager.error("Failed to create role", "Error");
      }
    } catch (error) {
      console.error("Error creating role:", error);
      NotificationManager.error("Error creating role. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Dialog
        open={openCreateRoles}
        onClose={() => setOpenCreateRoles(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create Roles</DialogTitle>
        <DialogContent>
          <Box mb={2} p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="roleName" className="input-label" required>
                    Role Name:
                  </InputLabel>
                  <TextField
                    className="input-field"
                    fullWidth
                    size="small"
                    name="roleName"
                    value={createRolesData.roleName}
                    onChange={(e) =>
                      setCreateRolesData({
                        ...createRolesData,
                        roleName: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="input-wrapper">
                  <InputLabel htmlFor="description" className="input-label" required>
                    Description:
                  </InputLabel>
                  <TextField
                    className="input-field"
                    fullWidth
                    size="small"
                    name="description"
                    value={createRolesData.description}
                    onChange={(e) =>
                      setCreateRolesData({
                        ...createRolesData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </Grid>

              {modulePermissions.map((modulePerm, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12}>

                    <div className="input-wrapper">
                      <Typography variant="body2" >{modulePerm.moduleName}:</Typography>
                      
                    </div>
                    <Grid container spacing={1} sx={{ marginLeft: "10px"}}>

                      <Grid item xs={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={modulePerm.permissions.create}
                              onChange={(e) => handlePermissionChange(index, e)}
                              name="create"
                            />
                          }
                          label="Create"
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={modulePerm.permissions.read}
                              onChange={(e) => handlePermissionChange(index, e)}
                              name="read"
                            />
                          }
                          label="Read"
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={modulePerm.permissions.update}
                              onChange={(e) => handlePermissionChange(index, e)}
                              name="update"
                            />
                          }
                          label="Update"
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={modulePerm.permissions.delete}
                              onChange={(e) => handlePermissionChange(index, e)}
                              name="delete"
                            />
                          }
                          label="Delete"
                        />
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCreateRoles(false);
              setCreateRolesData({
                roleName: "",
                description: "",
              });
              setModulePermissions([]);
            }}
            color="secondary"
          >
            Close
          </Button>
          <Button onClick={handleCreateRole} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CreateRolesDialog;
