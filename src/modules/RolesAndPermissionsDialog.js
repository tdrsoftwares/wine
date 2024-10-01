import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  Checkbox,
  Grid,
  FormControlLabel,
  IconButton,
  Divider,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const parsePermissions = (permissionsArray) => {
  const permissionsObject = {
    create: false,
    read: false,
    update: false,
    delete: false,
  };

  permissionsArray.forEach((permission) => {
    if (permission in permissionsObject) {
      permissionsObject[permission] = true;
    }
  });

  return permissionsObject;
};

const RolesAndPermissionsDialog = ({
  open,
  onClose,
  allRoleAndPermissions,
  handleDeleteRole,
  handlePermissionChange,
  handleRolesAndPermissionUpdate,
  loading
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Roles and Permissions</DialogTitle>
      <DialogContent>
        {allRoleAndPermissions && allRoleAndPermissions.length > 0 ? (
          allRoleAndPermissions.map((role, roleIndex) => (
            <div key={role._id} style={{ marginBottom: "20px" }}>
              {/* Role Header and Delete Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {role.name}
                </Typography>
                <IconButton
                  color="error"
                  aria-label="delete role"
                  onClick={() => handleDeleteRole(role._id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <Typography variant="body2" color="textSecondary">
                {role.description}
              </Typography>

              <Divider style={{ margin: "10px 0" }} />

              {/* Module Permissions List */}
              <List>
                {role.modulePermission && role.modulePermission.length > 0 ? (
                  role.modulePermission.map((module, moduleIndex) => {
                    const permissions = parsePermissions(
                      module.permission.permission
                    );

                    return (
                      <div key={module.permission._id}>
                        {/* Module Header */}
                        <Typography
                          variant="subtitle1"
                          style={{ fontWeight: "bold", marginTop: "10px" }}
                        >
                          {module.permission.moduleId.name}
                        </Typography>

                        <ListItem>
                          <Grid container spacing={2}>
                            {/* Create Permission */}
                            <Grid item xs={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={permissions.create || false}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        roleIndex,
                                        moduleIndex,
                                        "create",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Create"
                              />
                            </Grid>

                            {/* Read Permission */}
                            <Grid item xs={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={permissions.read || false}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        roleIndex,
                                        moduleIndex,
                                        "read",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Read"
                              />
                            </Grid>

                            {/* Update Permission */}
                            <Grid item xs={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={permissions.update || false}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        roleIndex,
                                        moduleIndex,
                                        "update",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Update"
                              />
                            </Grid>

                            {/* Delete Permission */}
                            <Grid item xs={2.5}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={permissions.delete || false}
                                    onChange={(e) =>
                                      handlePermissionChange(
                                        roleIndex,
                                        moduleIndex,
                                        "delete",
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Delete"
                              />
                            </Grid>

                            {/* UPDATE PERMISSION BUTTON */}
                            <Grid item xs={2}>
                              <IconButton
                                color="primary"
                                aria-label="save role"
                                onClick={() => handleRolesAndPermissionUpdate(roleIndex, moduleIndex)}
                                size="small"
                                // disabled={loading}
                                disabled
                              >
                                {loading ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  <SaveIcon />
                                )}
                              </IconButton>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </div>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListItemText primary="No specific permissions assigned." />
                  </ListItem>
                )}
              </List>
              <Divider style={{ marginTop: "20px" }} />
            </div>
          ))
        ) : (
          <Typography variant="body1">
            No roles and permissions available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RolesAndPermissionsDialog;
