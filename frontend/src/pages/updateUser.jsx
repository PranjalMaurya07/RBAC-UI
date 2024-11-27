import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import axios from "axios";

const { Option } = Select;

const UpdateUser = ({ user, roles, closeModal }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        role: user.role, // Set role to the role ID
        status: user.status,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/user/update/${user._id}`, values);
      message.success("User updated successfully");
      closeModal(); // Close modal and refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the name" }]}>
        <Input placeholder="Enter user name" />
      </Form.Item>

      <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select a role" }]}>
        <Select placeholder="Select a role">
          {roles.map((role) => (
            <Option key={role._id} value={role._id}>
              {role.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}>
        <Select placeholder="Select a status">
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUser;
