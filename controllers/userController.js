const User = require("../models/userModel");
const Role = require("../models/roleModel");

const handleUserRegistration = async (req, res) => {
  const { name, email, password, roleId, status } = req.body;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: roleId,
      status,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleGetUserDetails = async (req, res) => {
  try {
    const { role } = req.query; // Get role from query parameter
    const filter = role ? { role } : {}; // If role is provided, filter by role

    const users = await User.find(filter).populate("role"); // Populate the role field to get role name
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const handleGetSingleUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    return res.status(201).json({
      success: true,
      message: "User's details fetched successfully",
      user,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: "Some error occurred in user's details",
      e,
    });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, status } = req.body;

    if (!name || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, role, status) are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, role, status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

const handleDeleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  handleUserRegistration,
  handleGetUserDetails,
  handleGetSingleUserDetails,
  handleUpdateUser,
  handleDeleteUser,
};
