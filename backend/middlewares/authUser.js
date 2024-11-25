import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please log in again.",
      });
    }

    // Split and get the token after "Bearer"
    const token = authHeader.split(" ")[1];

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; // Attach the user ID to the request body
    next();
  } catch (error) {
    console.log("Error in auth middleware:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed. Please log in again.",
    });
  }
};

export default authUser;
