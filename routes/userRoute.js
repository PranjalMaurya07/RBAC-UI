const express = require("express");
const {
  handleUserRegistration,
  handleGetUserDetails,
  handleUpdateUser,
  handleGetSingleUserDetails,
  handleDeleteUser,
} = require("../controllers/userController");
const router = express.Router();

// register-user
router.post("/register", handleUserRegistration);

// get-user
router.get("/fetch", handleGetUserDetails);

// get-single-user
router.get("/get-user/:id", handleGetSingleUserDetails);

// update-user
router.put("/update/:id", handleUpdateUser);

// delete-user
router.delete("/delete/:id", handleDeleteUser);

module.exports = router;
