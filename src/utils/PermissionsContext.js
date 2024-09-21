import React, { createContext, useContext, useState } from "react";

const PermissionsContext = createContext();

export const usePermissions = () => {
  return useContext(PermissionsContext);
};


export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  console.log("permissions --> ", permissions)

  const setPermissionsData = (roleAndPermissions) => {
    const modulesPermissions = roleAndPermissions[0].modulePermission.map(
      (modPerm) => ({
        moduleId: modPerm.permission.moduleId._id,
        moduleName: modPerm.permission.moduleId.name,
        permissions: modPerm.permission.permission,
      })
    );
    setPermissions(modulesPermissions);
  };

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissionsData }}>
      {children}
    </PermissionsContext.Provider>
  );
};
