const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const authHeaders = req.headers?.authorization;

  // Check if Authorization header is present and starts with 'Bearer'
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }

  const token = authHeaders.split(" ")[1]; // Extract token from Bearer token

  try {
    // Verify token
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verifyUser; // Attach verified user info to request
    req.token = token; // Attach token to request
    next(); // Proceed to next middleware or route handler
  } catch (e) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

async function isAdmin(req, res, next) {
  try {
    const id = req.user.user_id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Forbidden: Admins only",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message, // Provide the error message in the response
      message: "Error in admin middleware",
    });
  }
}

module.exports = {
  auth,
  isAdmin,
};
