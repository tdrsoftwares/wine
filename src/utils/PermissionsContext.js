import React, { createContext, useContext, useState, useEffect } from "react";

const PermissionsContext = createContext();

export const usePermissions = () => {
  return useContext(PermissionsContext);
};

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedPermissions = localStorage.getItem("permissions");
    const savedRole = localStorage.getItem("role");

    if (savedPermissions) {
      setPermissions(JSON.parse(savedPermissions));
    }

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const setPermissionsData = (roleAndPermissions) => {
    if (roleAndPermissions) {
      const modulesPermissions = roleAndPermissions[0].modulePermission.map(
        (modPerm) => ({
          moduleId: modPerm.permission.moduleId._id,
          moduleName: modPerm.permission.moduleId.name,
          permissions: modPerm.permission.permission,
        })
      );
      console.log("modulesPermissions: ",modulesPermissions)
      setPermissions(modulesPermissions);
      localStorage.setItem("permissions", JSON.stringify(modulesPermissions));
    } else {
      setPermissions(null);
      localStorage.removeItem("permissions");
    }
  };

  const setRoleData = (role) => {
    setRole(role || null);
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  };

  return (
    <PermissionsContext.Provider
      value={{ permissions, setPermissionsData, role, setRoleData }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
