import React, { createContext, useContext, useState } from "react";

const PermissionsContext = createContext();

export const usePermissions = () => {
  return useContext(PermissionsContext);
};

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [role, setRole] = useState(null);

  const setPermissionsData = (roleAndPermissions) => {
    if (roleAndPermissions) {
      const modulesPermissions = roleAndPermissions[0].modulePermission.map(
        (modPerm) => ({
          moduleId: modPerm.permission.moduleId._id,
          moduleName: modPerm.permission.moduleId.name,
          permissions: modPerm.permission.permission,
        })
      );
      setPermissions(modulesPermissions);
    } else {
      setPermissions(null);
    }
  };

  const setRoleData = (role) => {
    setRole(role || null);
  };

  return (
    <PermissionsContext.Provider
      value={{ permissions, setPermissionsData, role, setRoleData }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
