const Role = require("../models/roleModel");

const handleAddRolesController = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    let role = await Role.findOne({ roleName });

    if (role) {
      return res.status(400).json({ message: "Role already exists!" });
    }

    role = new Role({
      roleName,
      permissions,
    });

    await role.save();
    return res.status(201).json({ message: "Role created successfully!" });
  } catch (error) {
    console.error("Error creating role:", error.message);
    res.status(500).json({ error: "Failed to create role" });
  }
};

const handleGetRolesController = async (req, res) => {
  try {
    const data = await Role.find().populate("permissions"); 
    return res.status(200).json({
      success: true,
      roles: data,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Error fetching roles",
      error: e.message,
    });
  }
};

const handleUpdateRolesController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    const role = await Role.findById(id);

    
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (name) role.name = name; 
    if (permissions) role.permissions = permissions; 

    
    const updatedRole = await role.save();

    res.status(200).json({
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Error updating role" });
  }
};

module.exports = {
  handleAddRolesController,
  handleGetRolesController,
  handleUpdateRolesController,
};
