const mongoose = require('mongoose');

// Define the Role Schema
const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    permissions: {
      type: [String], // Array of strings to store permission names
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

// Create Role model from schema
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
