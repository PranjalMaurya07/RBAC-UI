import React, { useState, useEffect } from "react";
import { Checkbox, Button, Input, message, Form } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import "../styles/addRole.css"

const AddRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      setPermissions([
        'Read',
        'Write',
        'Update',
        'Delete',
      ]);
    };

    fetchPermissions();
  }, []);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedPermissions(checkedValues);
  };

  const handleSubmit = async () => {
    if (!roleName.trim()) {
      message.error("Role name is required!");
      return;
    }

    if (selectedPermissions.length === 0) {
      message.error("At least one permission must be selected!");
      return;
    }

    const roleData = {
      roleName: roleName.trim(),
      permissions: selectedPermissions
    };

    try {
      // Send the new role and permissions to the backend
      await axios.post("http://localhost:8000/api/role/add-role", roleData);
      message.success("Role added successfully!");
      navigate('/permissions');
      // Clear the form
      setRoleName("");
      setSelectedPermissions([]);
    } catch (error) {
      console.error("Error adding role:", error.message);
      message.error("Failed to add role");
    }
  };

  return (
    <Layout title={"Roles"}>
      <div className="add-role-container">
        <h2 className="add-role-heading">Create New Role</h2>
        <Form onFinish={handleSubmit} className="add-role-form">
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={[{ required: true, message: "Please input the role name!" }]}
            className="form-item"
          >
            <Input
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="input-field"
            />
          </Form.Item>

          <Form.Item label="Permissions" className="form-item">
            <Checkbox.Group
              value={selectedPermissions}
              onChange={handleCheckboxChange}
              className="permissions-group"
            >
              <div className="permissions-list">
                {permissions.map((permission) => (
                  <Checkbox key={permission} value={permission} className="permission-item">
                    {permission.replace('_', ' ').toUpperCase()}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item className="form-item">
            <Button type="primary" htmlType="submit" className="submit-btn">
              Create Role
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default AddRole;
