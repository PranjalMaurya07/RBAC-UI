import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./layout";
import "../styles/permission.css"

const RolePermissionsList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRoles = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/role/get-role");
      setRoles(data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Layout title={"Permissions"}>
      <div className="role-permissions-list-container">
        <h1 className="role-permissions-heading">Roles and Permissions</h1>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <table className="role-permissions-table">
            <thead>
              <tr>
                <th className="table-header">Role</th>
                <th className="table-header">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role._id} className="table-row">
                  <td className="role-name">{role.roleName}</td>
                  <td className="permissions-list">
                    {role.permissions?.map((permission) => (
                      <span key={permission} className="badge bg-info m-1">
                        {permission}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default RolePermissionsList;
