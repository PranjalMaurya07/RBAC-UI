const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("./roleModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Role",
      required: [true, "Role is required"],
      validate: {
        validator: async function (roleId) {

          const role = await Role.findById(roleId);
          return role != null; 
        },
        message: "Invalid role assigned",
      },
    },
    status: {
      type: String,
      default: "Inactive",
      enum: ["Active", "Inactive"],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthTokens = async function () {
  try {
    const tokenGenerated = jwt.sign(
      { user_id: this._id },
      process.env.SECRET_KEY
    );
    await this.save();
    return tokenGenerated;
  } catch (error) {
    console.log("Error", error);
  }
};

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    console.log("Error", error);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
