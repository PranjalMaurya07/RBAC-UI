const express = require("express");
const {
  handleAddRolesController,
  handleGetRolesController,
  handleUpdateRolesController,
} = require("../controllers/roleController");

const router = express.Router();

router.post("/add-role", handleAddRolesController);

router.get("/get-role", handleGetRolesController);

router.put("/update-role/:id", handleUpdateRolesController);

module.exports = router;
