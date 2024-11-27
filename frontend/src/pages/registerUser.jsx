import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "./layout";
import "../styles/register.css";

const Register = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get(
          "https://rbac-ui-backend.onrender.com/api/role/get-role"
        );
        setRoles(data.roles); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://rbac-ui-backend.onrender.com/api/user/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          roleId: values.role, 
          status: values.status,
        }
      );

      notification.success({
        message: "User Created",
        description: "User created successfully.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      notification.error({
        message: "Error",
        description: "There was an error creating the user.",
      });
    }
  };

  return (
    <Layout title={"Register Users"}>
      <div className="register-container">
        <h1>Add New User</h1>

        {loading ? (
          <p>Loading roles...</p>
        ) : (
          <Form layout="vertical" onFinish={handleSubmit} className="register-form">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password className="register-input" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select className="register-select" defaultValue="Inactive">
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select className="register-select" placeholder="Select a role">
                {roles.map((role) => (
                  <Select.Option key={role._id} value={role._id}>
                    {role.roleName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-button">
                Add User
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
