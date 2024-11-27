import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Modal, notification, Select } from "antd";
import Layout from "./layout";
import UpdateUser from "./updateUser";
import "../styles/homepage.css";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(""); // New state for selected role

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/user/fetch", {
        params: { role: selectedRole }, // Pass selected role as a query parameter
      });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      notification.error({
        message: "Error",
        description: "Failed to load user data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/role/get-role");
      setRoles(data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      notification.error({
        message: "Error",
        description: "Failed to load role data.",
      });
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find((r) => String(r._id) === String(roleId._id));
    return role ? role.roleName : "Unknown Role";
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/delete/${userId}`);
      message.success("User deleted successfully");
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
      message.error("Failed to delete user");
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    getUsers();
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value); // Update the selected role
    setLoading(true); // Reset loading state when the filter is changed
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, [selectedRole]); // Fetch users again whenever the selected role changes

  return (
    <Layout title={"All Users"}>
      <div className="homepage-container">
        <h1 className="homepage-title">All Users</h1>

        {/* Role Filter Dropdown */}
        <div className="filter-container">
          <Select
            placeholder="Select Role"
            style={{ width: "100%" }}
            value={selectedRole}
            onChange={handleRoleChange}
            allowClear
          >
            <Select.Option value="">All Roles</Select.Option>
            {roles.map((role) => (
              <Select.Option key={role._id} value={role._id}>
                {role.roleName}
              </Select.Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : users?.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Modify</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{getRoleName(user.role)}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => handleUpdate(user)}
                      className="modify-button"
                    >
                      Update
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => handleDelete(user._id)}
                      className="delete-button"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-users-text">No users found.</p>
        )}
      </div>

      <Modal
        title="Update User"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <UpdateUser user={selectedUser} roles={roles} closeModal={closeModal} />
      </Modal>
    </Layout>
  );
};

export default Homepage;
